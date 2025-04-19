const crosshair = document.getElementById('crosshair');
        
// Move crosshair with mouse
document.addEventListener('mousemove', (e) => {
            crosshair.style.left = `${e.clientX}px`;
            crosshair.style.top = `${e.clientY}px`;
        });
        
        // Optional click animation
        document.addEventListener('mousedown', () => {
            crosshair.classList.add('clicked');
        });
        
        document.addEventListener('mouseup', () => {
            crosshair.classList.remove('clicked');
        });
        
        // Hide crosshair when mouse leaves window
        document.addEventListener('mouseleave', () => {
            crosshair.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            crosshair.style.opacity = '1';
        });