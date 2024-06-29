const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spin');
const addNameButton = document.getElementById('addName');
const nameInput = document.getElementById('nameInput');

let names = ['Jasim', 'Ibrahim', 'Rifat', 'Teebro', 'Jisan'];
let angles = [];
let currentAngle = 0;

function drawWheel() {
    const numSegments = names.length;
    const anglePerSegment = (2 * Math.PI) / numSegments;

    angles = [];

    for (let i = 0; i < numSegments; i++) {
        angles.push(currentAngle + i * anglePerSegment);

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, angles[i], angles[i] + anglePerSegment);
        ctx.closePath();
        ctx.fillStyle = `hsl(${i * (360 / numSegments)}, 100%, 50%)`;
        ctx.fill();
        ctx.stroke();
        
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angles[i] + anglePerSegment / 2);
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.font = "bold 20px Arial";
        ctx.fillText(names[i], canvas.width / 4, 10);
        ctx.restore();
    }
}

function spinWheel() {
    const randomIndex = Math.floor(Math.random() * names.length);
    const endAngle = angles[randomIndex] + (2 * Math.PI * 5); // 5 full rotations
    let currentAngle = 0;
    const spinSpeed = 0.05;

    function animateSpin() {
        if (currentAngle < endAngle) {
            currentAngle += spinSpeed;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(currentAngle);
            ctx.translate(-canvas.width / 2, -canvas.height / 2);
            drawWheel();
            ctx.restore();
            requestAnimationFrame(animateSpin);
        } else {
            alert(`The wheel landed on: ${names[randomIndex]}`);
        }
    }

    animateSpin();
}

spinButton.addEventListener('click', spinWheel);

addNameButton.addEventListener('click', () => {
    const newName = nameInput.value.trim();
    if (newName) {
        names.push(newName);
        drawWheel();
    }
    nameInput.value = '';
});

drawWheel();
