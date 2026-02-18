const canvas = document.getElementById('topoCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Create multiple layers of “mountain contour lines”
const layers = [];
const layerCount = 6;

for (let i = 0; i < layerCount; i++) {
    const points = [];
    const step = 60; // distance between points
    for (let x = 0; x <= width + step; x += step) {
        points.push({
            x: x,
            y: height/2 + Math.random()*100 - 50 - i*20
        });
    }
    layers.push({ points, speed: 0.2 + i*0.1, opacity: 0.3 - i*0.03 });
}

// Draw a single layer
function drawLayer(layer) {
    ctx.beginPath();
    ctx.moveTo(0, height);
    for (let i = 0; i < layer.points.length; i++) {
        const p = layer.points[i];
        ctx.lineTo(p.x, p.y);
    }
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.strokeStyle = `rgba(34,197,94,${layer.opacity})`;
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Animate layers
function animate() {
    ctx.clearRect(0, 0, width, height);
    layers.forEach(layer => {
        // Move points left
        layer.points.forEach(p => p.x -= layer.speed);
        // Loop points
        if (layer.points[0].x < -60) {
            const first = layer.points.shift();
            first.x = layer.points[layer.points.length-1].x + 60;
            layer.points.push(first);
        }
        drawLayer(layer);
    });
    requestAnimationFrame(animate);
}

animate();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});
