/**
 * drawing.js
 * SVG Tactical Whiteboard Drawing Engine.
 * Supports straight arrows, curved arrows, passing lanes, player runs,
 * defensive lines, highlighted zones, pressing triggers, and numbered sequence markers.
 */

class TacticalDrawingEngine {
  constructor(svgElement, onDrawingChange) {
    this.svg = svgElement;
    this.onDrawingChange = onDrawingChange;
    this.drawings = [];
    this.activeTool = 'select'; // 'select', 'arrow', 'curved', 'pass', 'run', 'defensive_line', 'zone', 'trigger', 'sequence', 'eraser'
    this.currentColor = '#38bdf8'; // Default electric cyan
    this.strokeWidth = 3;
    this.selectedDrawingId = null;
    this.isDrawing = false;
    this.currentStart = null;
    this.tempDrawingElement = null;
    this.sequenceCounter = 1;

    this.container = this.svg.querySelector('#tactical-drawings-layer');
    if (!this.container) {
      this.container = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      this.container.id = 'tactical-drawings-layer';
      this.svg.appendChild(this.container);
    }

    this.initMarkers();
    this.bindEvents();
  }

  initMarkers() {
    let defs = this.svg.querySelector('defs');
    if (!defs) {
      defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      this.svg.insertBefore(defs, this.svg.firstChild);
    }
    this.defs = defs;
    this.updateMarkerDefs();
  }

  updateMarkerDefs() {
    const colors = ['#38bdf8', '#34d399', '#f59e0b', '#ef4444', '#a855f7', '#ffffff', '#ec4899'];
    colors.forEach(col => {
      const cleanHex = col.replace('#', '');
      if (!this.defs.querySelector(`#arrowhead-${cleanHex}`)) {
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        marker.setAttribute('id', `arrowhead-${cleanHex}`);
        marker.setAttribute('viewBox', '0 0 10 10');
        marker.setAttribute('refX', '7');
        marker.setAttribute('refY', '5');
        marker.setAttribute('markerWidth', '6');
        marker.setAttribute('markerHeight', '6');
        marker.setAttribute('orient', 'auto-start-reverse');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M 0 1.5 L 8 5 L 0 8.5 z');
        path.setAttribute('fill', col);
        marker.appendChild(path);
        this.defs.appendChild(marker);
      }
    });
  }

  setTool(tool) {
    this.activeTool = tool;
    this.selectedDrawingId = null;
    this.render();
  }

  setColor(color) {
    this.currentColor = color;
    this.updateMarkerDefs();
  }

  setStrokeWidth(width) {
    this.strokeWidth = width;
  }

  getSvgCoordinates(e) {
    const pt = this.svg.createSVGPoint();
    const evt = e.touches && e.touches[0] ? e.touches[0] : e;
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    const transformed = pt.matrixTransform(this.svg.getScreenCTM().inverse());
    // Convert to normalized 0-100% within active pitch area (40 to 640 in x, 40 to 960 in y)
    const normX = Math.max(0, Math.min(100, ((transformed.x - 40) / 600) * 100));
    const normY = Math.max(0, Math.min(100, ((transformed.y - 40) / 920) * 100));
    return {
      svgX: Math.round(transformed.x),
      svgY: Math.round(transformed.y),
      normX: Math.round(normX * 10) / 10,
      normY: Math.round(normY * 10) / 10
    };
  }

  bindEvents() {
    const onStart = (e) => {
      if (this.activeTool === 'select') return;
      if (e.target.closest('.player-chip') || e.target.closest('#tactical-ball')) return;

      const coords = this.getSvgCoordinates(e);

      if (this.activeTool === 'eraser') {
        const targetDrawing = e.target.closest('.tactical-drawing-item');
        if (targetDrawing) {
          const id = targetDrawing.getAttribute('data-drawing-id');
          this.deleteDrawing(id);
        }
        return;
      }

      if (this.activeTool === 'sequence') {
        this.addDrawing({
          id: 'draw_' + Date.now(),
          type: 'sequence',
          x: coords.normX,
          y: coords.normY,
          number: this.sequenceCounter++,
          color: this.currentColor
        });
        return;
      }

      if (this.activeTool === 'trigger') {
        this.addDrawing({
          id: 'draw_' + Date.now(),
          type: 'trigger',
          center: { x: coords.normX, y: coords.normY },
          radius: 25,
          color: this.currentColor,
          label: 'Pressing Trigger'
        });
        return;
      }

      this.isDrawing = true;
      this.currentStart = coords;
      e.preventDefault();
    };

    const onMove = (e) => {
      if (!this.isDrawing || !this.currentStart) return;
      const coords = this.getSvgCoordinates(e);
      this.renderLivePreview(this.currentStart, coords);
      e.preventDefault();
    };

    const onEnd = (e) => {
      if (!this.isDrawing || !this.currentStart) return;
      this.isDrawing = false;
      const coords = this.getSvgCoordinates(e);

      // Check minimum drag distance to prevent accidental micro-clicks
      const dist = Math.hypot(coords.normX - this.currentStart.normX, coords.normY - this.currentStart.normY);
      if (dist > 1.5) {
        let newDrawing = null;
        const id = 'draw_' + Date.now();

        switch (this.activeTool) {
          case 'arrow':
            newDrawing = {
              id,
              type: 'arrow',
              from: { x: this.currentStart.normX, y: this.currentStart.normY },
              to: { x: coords.normX, y: coords.normY },
              color: this.currentColor,
              width: this.strokeWidth
            };
            break;
          case 'curved':
            // Midpoint offset control for curved arrow
            const midX = (this.currentStart.normX + coords.normX) / 2;
            const midY = (this.currentStart.normY + coords.normY) / 2;
            const dx = coords.normX - this.currentStart.normX;
            const dy = coords.normY - this.currentStart.normY;
            // Normal perpendicular vector
            const perpX = midX - dy * 0.25;
            const perpY = midY + dx * 0.25;
            newDrawing = {
              id,
              type: 'curved',
              from: { x: this.currentStart.normX, y: this.currentStart.normY },
              to: { x: coords.normX, y: coords.normY },
              control: { x: Math.round(perpX), y: Math.round(perpY) },
              color: this.currentColor,
              width: this.strokeWidth
            };
            break;
          case 'pass':
            newDrawing = {
              id,
              type: 'pass',
              from: { x: this.currentStart.normX, y: this.currentStart.normY },
              to: { x: coords.normX, y: coords.normY },
              color: this.currentColor,
              width: this.strokeWidth
            };
            break;
          case 'run':
            newDrawing = {
              id,
              type: 'run',
              from: { x: this.currentStart.normX, y: this.currentStart.normY },
              to: { x: coords.normX, y: coords.normY },
              color: this.currentColor,
              width: this.strokeWidth
            };
            break;
          case 'defensive_line':
            newDrawing = {
              id,
              type: 'defensive_line',
              from: { x: this.currentStart.normX, y: this.currentStart.normY },
              to: { x: coords.normX, y: coords.normY },
              color: this.currentColor,
              width: this.strokeWidth
            };
            break;
          case 'zone':
            const minX = Math.min(this.currentStart.normX, coords.normX);
            const maxX = Math.max(this.currentStart.normX, coords.normX);
            const minY = Math.min(this.currentStart.normY, coords.normY);
            const maxY = Math.max(this.currentStart.normY, coords.normY);
            newDrawing = {
              id,
              type: 'zone',
              points: [
                { x: minX, y: minY },
                { x: maxX, y: minY },
                { x: maxX, y: maxY },
                { x: minX, y: maxY }
              ],
              color: this.currentColor,
              opacity: 0.25
            };
            break;
        }

        if (newDrawing) {
          this.addDrawing(newDrawing);
        }
      }

      this.currentStart = null;
      this.clearLivePreview();
    };

    this.svg.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    this.svg.addEventListener('touchstart', onStart, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
  }

  renderLivePreview(start, end) {
    this.clearLivePreview();
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.id = 'drawing-preview';
    g.style.pointerEvents = 'none';
    g.style.opacity = '0.75';

    const cleanHex = this.currentColor.replace('#', '');
    const startSvg = this.normToSvg(start.normX, start.normY);
    const endSvg = this.normToSvg(end.normX, end.normY);

    if (this.activeTool === 'arrow' || this.activeTool === 'pass' || this.activeTool === 'run') {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', startSvg.x);
      line.setAttribute('y1', startSvg.y);
      line.setAttribute('x2', endSvg.x);
      line.setAttribute('y2', endSvg.y);
      line.setAttribute('stroke', this.currentColor);
      line.setAttribute('stroke-width', this.strokeWidth);
      line.setAttribute('marker-end', `url(#arrowhead-${cleanHex})`);
      if (this.activeTool === 'pass') {
        line.setAttribute('stroke-dasharray', '8,6');
      } else if (this.activeTool === 'run') {
        line.setAttribute('stroke-dasharray', '4,4');
      }
      g.appendChild(line);
    } else if (this.activeTool === 'curved') {
      const midX = (startSvg.x + endSvg.x) / 2;
      const midY = (startSvg.y + endSvg.y) / 2;
      const dx = endSvg.x - startSvg.x;
      const dy = endSvg.y - startSvg.y;
      const ctrlX = midX - dy * 0.25;
      const ctrlY = midY + dx * 0.25;
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M ${startSvg.x} ${startSvg.y} Q ${ctrlX} ${ctrlY} ${endSvg.x} ${endSvg.y}`);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', this.currentColor);
      path.setAttribute('stroke-width', this.strokeWidth);
      path.setAttribute('marker-end', `url(#arrowhead-${cleanHex})`);
      g.appendChild(path);
    } else if (this.activeTool === 'defensive_line') {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', startSvg.x);
      line.setAttribute('y1', startSvg.y);
      line.setAttribute('x2', endSvg.x);
      line.setAttribute('y2', endSvg.y);
      line.setAttribute('stroke', this.currentColor);
      line.setAttribute('stroke-width', this.strokeWidth + 2);
      line.setAttribute('stroke-dasharray', '12,6');
      g.appendChild(line);
    } else if (this.activeTool === 'zone') {
      const minX = Math.min(startSvg.x, endSvg.x);
      const minY = Math.min(startSvg.y, endSvg.y);
      const w = Math.abs(endSvg.x - startSvg.x);
      const h = Math.abs(endSvg.y - startSvg.y);
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', minX);
      rect.setAttribute('y', minY);
      rect.setAttribute('width', w);
      rect.setAttribute('height', h);
      rect.setAttribute('fill', this.currentColor);
      rect.setAttribute('fill-opacity', '0.25');
      rect.setAttribute('stroke', this.currentColor);
      rect.setAttribute('stroke-dasharray', '6,4');
      g.appendChild(rect);
    }

    this.svg.appendChild(g);
  }

  clearLivePreview() {
    const prev = this.svg.querySelector('#drawing-preview');
    if (prev) prev.remove();
  }

  normToSvg(normX, normY) {
    return {
      x: 40 + (normX / 100) * 600,
      y: 40 + (normY / 100) * 920
    };
  }

  addDrawing(drawing) {
    this.drawings.push(drawing);
    this.render();
    if (this.onDrawingChange) {
      this.onDrawingChange(this.drawings);
    }
  }

  deleteDrawing(id) {
    this.drawings = this.drawings.filter(d => d.id !== id);
    if (this.selectedDrawingId === id) this.selectedDrawingId = null;
    this.render();
    if (this.onDrawingChange) {
      this.onDrawingChange(this.drawings);
    }
  }

  clearAll() {
    this.drawings = [];
    this.selectedDrawingId = null;
    this.sequenceCounter = 1;
    this.render();
    if (this.onDrawingChange) {
      this.onDrawingChange(this.drawings);
    }
  }

  setDrawings(drawings) {
    this.drawings = Array.isArray(drawings) ? JSON.parse(JSON.stringify(drawings)) : [];
    // Adjust sequence counter
    let maxSeq = 0;
    this.drawings.forEach(d => {
      if (d.type === 'sequence' && d.number > maxSeq) maxSeq = d.number;
    });
    this.sequenceCounter = maxSeq + 1;
    this.render();
  }

  render() {
    this.container.innerHTML = '';
    this.drawings.forEach(d => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'tactical-drawing-item');
      g.setAttribute('data-drawing-id', d.id);
      g.style.cursor = this.activeTool === 'eraser' ? 'not-allowed' : (this.activeTool === 'select' ? 'pointer' : 'default');

      const col = d.color || this.currentColor;
      const cleanHex = col.replace('#', '');
      const width = d.width || this.strokeWidth;

      if (d.type === 'arrow' || d.type === 'pass' || d.type === 'run') {
        const from = this.normToSvg(d.from.x, d.from.y);
        const to = this.normToSvg(d.to.x, d.to.y);
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', from.x);
        line.setAttribute('y1', from.y);
        line.setAttribute('x2', to.x);
        line.setAttribute('y2', to.y);
        line.setAttribute('stroke', col);
        line.setAttribute('stroke-width', width);
        line.setAttribute('stroke-linecap', 'round');
        line.setAttribute('marker-end', `url(#arrowhead-${cleanHex})`);

        if (d.type === 'pass') {
          line.setAttribute('stroke-dasharray', '8,6');
        } else if (d.type === 'run') {
          line.setAttribute('stroke-dasharray', '4,4');
        }
        g.appendChild(line);

        if (d.label) {
          const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          txt.setAttribute('x', (from.x + to.x) / 2);
          txt.setAttribute('y', (from.y + to.y) / 2 - 8);
          txt.setAttribute('text-anchor', 'middle');
          txt.setAttribute('fill', col);
          txt.setAttribute('font-size', '11');
          txt.setAttribute('font-weight', '600');
          txt.textContent = d.label;
          g.appendChild(txt);
        }
      } else if (d.type === 'curved') {
        const from = this.normToSvg(d.from.x, d.from.y);
        const to = this.normToSvg(d.to.x, d.to.y);
        const ctrl = this.normToSvg(d.control.x, d.control.y);
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M ${from.x} ${from.y} Q ${ctrl.x} ${ctrl.y} ${to.x} ${to.y}`);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', col);
        path.setAttribute('stroke-width', width);
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('marker-end', `url(#arrowhead-${cleanHex})`);
        g.appendChild(path);

        if (d.label) {
          const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          txt.setAttribute('x', ctrl.x);
          txt.setAttribute('y', ctrl.y - 8);
          txt.setAttribute('text-anchor', 'middle');
          txt.setAttribute('fill', col);
          txt.setAttribute('font-size', '11');
          txt.setAttribute('font-weight', '600');
          txt.textContent = d.label;
          g.appendChild(txt);
        }
      } else if (d.type === 'defensive_line') {
        const from = this.normToSvg(d.from.x, d.from.y);
        const to = this.normToSvg(d.to.x, d.to.y);
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', from.x);
        line.setAttribute('y1', from.y);
        line.setAttribute('x2', to.x);
        line.setAttribute('y2', to.y);
        line.setAttribute('stroke', col);
        line.setAttribute('stroke-width', width + 2);
        line.setAttribute('stroke-dasharray', '12,6');
        line.setAttribute('stroke-linecap', 'square');
        g.appendChild(line);

        if (d.label) {
          const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          txt.setAttribute('x', (from.x + to.x) / 2);
          txt.setAttribute('y', (from.y + to.y) / 2 - 8);
          txt.setAttribute('text-anchor', 'middle');
          txt.setAttribute('fill', col);
          txt.setAttribute('font-size', '11');
          txt.setAttribute('font-weight', '700');
          txt.setAttribute('letter-spacing', '1px');
          txt.textContent = d.label;
          g.appendChild(txt);
        }
      } else if (d.type === 'zone') {
        if (d.points && d.points.length >= 3) {
          const ptsStr = d.points.map(p => {
            const svgP = this.normToSvg(p.x, p.y);
            return `${svgP.x},${svgP.y}`;
          }).join(' ');
          const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
          poly.setAttribute('points', ptsStr);
          poly.setAttribute('fill', col);
          poly.setAttribute('fill-opacity', d.opacity || '0.22');
          poly.setAttribute('stroke', col);
          poly.setAttribute('stroke-width', '2');
          poly.setAttribute('stroke-dasharray', '6,4');
          g.appendChild(poly);

          if (d.label) {
            const center = d.points.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }), { x: 0, y: 0 });
            center.x /= d.points.length;
            center.y /= d.points.length;
            const svgC = this.normToSvg(center.x, center.y);
            const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            txt.setAttribute('x', svgC.x);
            txt.setAttribute('y', svgC.y + 4);
            txt.setAttribute('text-anchor', 'middle');
            txt.setAttribute('fill', '#ffffff');
            txt.setAttribute('font-size', '12');
            txt.setAttribute('font-weight', '700');
            txt.style.textShadow = '0 2px 4px rgba(0,0,0,0.8)';
            txt.textContent = d.label;
            g.appendChild(txt);
          }
        }
      } else if (d.type === 'trigger') {
        const center = this.normToSvg(d.center.x, d.center.y);
        const circleOuter = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circleOuter.setAttribute('cx', center.x);
        circleOuter.setAttribute('cy', center.y);
        circleOuter.setAttribute('r', d.radius || 25);
        circleOuter.setAttribute('fill', col);
        circleOuter.setAttribute('fill-opacity', '0.18');
        circleOuter.setAttribute('stroke', col);
        circleOuter.setAttribute('stroke-width', '2');
        circleOuter.setAttribute('stroke-dasharray', '4,3');
        g.appendChild(circleOuter);

        const circleInner = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circleInner.setAttribute('cx', center.x);
        circleInner.setAttribute('cy', center.y);
        circleInner.setAttribute('r', '5');
        circleInner.setAttribute('fill', col);
        g.appendChild(circleInner);

        if (d.label) {
          const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          txt.setAttribute('x', center.x);
          txt.setAttribute('y', center.y - (d.radius || 25) - 6);
          txt.setAttribute('text-anchor', 'middle');
          txt.setAttribute('fill', col);
          txt.setAttribute('font-size', '10');
          txt.setAttribute('font-weight', '700');
          txt.textContent = d.label;
          g.appendChild(txt);
        }
      } else if (d.type === 'sequence') {
        const pt = this.normToSvg(d.x, d.y);
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', pt.x);
        circle.setAttribute('cy', pt.y);
        circle.setAttribute('r', '13');
        circle.setAttribute('fill', col);
        circle.setAttribute('stroke', '#ffffff');
        circle.setAttribute('stroke-width', '2');
        g.appendChild(circle);

        const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        txt.setAttribute('x', pt.x);
        txt.setAttribute('y', pt.y + 4.5);
        txt.setAttribute('text-anchor', 'middle');
        txt.setAttribute('fill', '#0f172a');
        txt.setAttribute('font-size', '12');
        txt.setAttribute('font-weight', '800');
        txt.textContent = d.number;
        g.appendChild(txt);
      }

      // Selection indicator
      if (this.selectedDrawingId === d.id) {
        g.style.filter = 'drop-shadow(0 0 6px #f59e0b)';
      }

      g.addEventListener('click', (e) => {
        if (this.activeTool === 'eraser') {
          e.stopPropagation();
          this.deleteDrawing(d.id);
        } else if (this.activeTool === 'select') {
          e.stopPropagation();
          this.selectedDrawingId = (this.selectedDrawingId === d.id) ? null : d.id;
          this.render();
        }
      });

      this.container.appendChild(g);
    });
  }
}

window.TacticalDrawingEngine = TacticalDrawingEngine;
