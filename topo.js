const canvas = document.getElementById('topoCanvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Create moving contour lines
const lines = [];
const lineCount = 25;
for(let i=0; i<lineCount; i++){
    lines.push({
        y: i*30 + 50,
        offset: Math.random()*50,
        speed: 0.3 + Math.random()*0.2
    });
}

function animate() {
    // Moss-green background
    ctx.fillStyle = "#0e1511";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // Draw moving lines
    ctx.strokeStyle = "#a4f9a4";
    ctx.lineWidth = 2.5;
    ctx.shadowColor = "#a4f9a4";
    ctx.shadowBlur = 3;

    lines.forEach(line => {
        ctx.beginPath();
        let y = line.y + Math.sin(Date.now()/1000 + line.offset)*20;
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    });

    requestAnimationFrame(animate);
}

animate();
