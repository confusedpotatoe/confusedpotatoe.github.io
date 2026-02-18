const canvas = document.getElementById('topoCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    // Handle high-DPI screens
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
}

resizeCanvas();

// Mountain layers
const layers = [];
const layerCount = 6;

for (let i = 0; i < layerCount; i++) {
    const points = [];
    const step = 50;
    for (let x = 0; x <= window.innerWidth + step; x += step) {
        points.push({
            x: x,
            y: window.innerHeight/2 + Math.random() * 120 - 60 - i*25
        });
    }
    layers.push({ points, speed: 0.3 + i*0.1, opacity: 0.5 - i*0.05 });
}

function drawLayer(layer) {
    ctx.beginPath();
    ctx.moveTo(0, window.innerHeight);
    for (let i = 0; i < layer.points.length; i++) {
        const p = layer.points[i];
        ctx.lineTo(p.x, p.y);
    }
    ctx.lineTo(window.innerWidth, window.innerHeight);
    ctx.closePath();
    ctx.strokeStyle = `rgba(34,197,94,
