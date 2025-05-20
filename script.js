const rangeSlider = document.querySelector("#co2");
const co2Level = document.querySelector(".co2-level");
const oxyLevel = document.querySelector(".oxy-level");
const plants = document.querySelector(".plants");

let currentColor = [255, 255, 255]; // Start with white or your initial color
let animationFrame; // To track the animation so we can cancel it

rangeSlider.addEventListener("input", function () {
    co2Level.textContent = "CO2 Level: " + rangeSlider.value;

    const max = Number(rangeSlider.max) || 100;
    const rangeValue = Number(rangeSlider.value);
    const color1 = 255 - Math.round((rangeValue / max) * 255);
    const color2 = 255 - Math.round((rangeValue / max) * 250);

    let color3 = 255;
    if (rangeValue >= 50) {
        const t = (rangeValue - 50) / (max - 50);
        color3 = Math.round(255 - (t * 150));
    }

    const targetColor = [color1, color3, color2];

    if (animationFrame) cancelAnimationFrame(animationFrame);

    const steps = 200;
    let step = 0;
    const startColor = [...currentColor];

    function animate() {
        step++;
        const progress = step / steps;
        // Interpolate each color channel
        const r = Math.round(startColor[0] + (targetColor[0] - startColor[0]) * progress);
        const g = Math.round(startColor[1] + (targetColor[1] - startColor[1]) * progress);
        const b = Math.round(startColor[2] + (targetColor[2] - startColor[2]) * progress);

        plants.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        if (step < steps) {
            animationFrame = requestAnimationFrame(animate);
        } else {
            currentColor = targetColor;
        }
    }
    animate();
});