document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('signature-pad');
    var ctx = canvas.getContext('2d');
    var drawing = false;
    var strokes = [];
    var cursorColor = 'red'; // Default cursor color
    var bgColor = 'white'; // Default background color

    // Set initial background color
    canvas.style.backgroundColor = bgColor;

    canvas.addEventListener('mousedown', function (e) {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    });

    canvas.addEventListener('mousemove', function (e) {
        if (drawing) {
            ctx.strokeStyle = cursorColor; // Set cursor color
            ctx.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
            ctx.stroke();
        }
    });

    canvas.addEventListener('mouseup', function () {
        if (drawing) {
            drawing = false;
            strokes.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        }
    });

    document.getElementById('clear-button').addEventListener('click', function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        strokes = [];
        // Reapply the background color after clearing the canvas
        canvas.style.backgroundColor = bgColor;
    });

    document.getElementById('cursor-color-picker').addEventListener('input', function (e) {
        cursorColor = e.target.value; // Update cursor color
    });

    document.getElementById('bg-color-picker').addEventListener('input', function (e) {
        bgColor = e.target.value; // Update background color
        canvas.style.backgroundColor = bgColor; // Apply background color to canvas
    });
    document.getElementById('download-button').addEventListener('click', function () {
        // Draw a white background on the canvas
        ctx.fillStyle = bgColor; // Set background color
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Redraw all the strokes
        strokes.forEach(function (stroke) {
            ctx.putImageData(stroke, 0, 0);
        });

        // Get the data URL of the canvas with the white background
        var dataURL = canvas.toDataURL("image/png");

        // Create a link element to trigger the download
        var link = document.createElement('a');
        link.href = dataURL;
        link.download = 'signature.png';
        link.click();
    });

});
