const canvas = document.getElementById('topoCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

// Mountain layers
const layers = [];
const layerCount = 5;

for (let i = 0; i < layerCount; i++) {
    const points = [];
    const step = 50;
    for (let x = 0; x <= window.innerWidth + step; x += step) {
        points.push({
            x: x,
            y: window.innerHeight/2 + Math.random() * 120 - 60 - i*20
        });
    }
    layers.push({ points, speed: 0.5 + i*0.1, opacity: 0.6 - i*0.1 });
}

function drawLayer(layer) {
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    for (let i = 0; i < layer.points.length; i++) {
        const p = layer.points[i];
        ctx.lineTo(p.x, p.y);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.closePath();
    ctx.strokeStyle = `rgba(164, 249, 164, ${layer.opacity})`; // bright green
    ctx.lineWidth = 2.5;
    ctx.shadowColor = `rgba(164,249,164,0.4)`; // subtle glow
    ctx.shadowBlur = 3;
    ctx.stroke();
}

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    layers.forEach(layer => {
        layer.points.forEach(p => p.x -= layer.speed);
        if(layer.points[0].x < -50) {
            const first = layer.points.shift();
            first.x = layer.points[layer.points.length-1].x + 50;
            layer.points.push(first);
        }
        drawLayer(layer);
    });
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    resizeCanvas();
    layers.forEach(layer => {
        layer.points = [];
        const step = 50;
        for (let x = 0; x <= window.innerWidth + step; x += step) {
            layer.points.push({
