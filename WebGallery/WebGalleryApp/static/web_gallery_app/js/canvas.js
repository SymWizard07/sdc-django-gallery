document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('artCanvas');
    const ctx = canvas.getContext('2d');
    let drawing = false;

    canvas.addEventListener('mousedown', () => drawing = true);
    canvas.addEventListener('mouseup', () => drawing = false);
    canvas.addEventListener('mousemove', draw);

    function draw(e) {
        if (!drawing) return;
        const rect = canvas.getBoundingClientRect();
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(e.clientX - rect.left, e.clientY - rect.top, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    window.submitArtwork = function () {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const image_data = canvas.toDataURL('image/png');

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author, image_data })
        })
            .then(res => res.json())
            .then(() => location.reload());
    }

    window.clearCanvas = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});