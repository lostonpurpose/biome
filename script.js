const co2RangeSlider = document.querySelector("#co2");
const co2Level = document.querySelector(".co2-level");
const oxyLevel = document.querySelector(".oxy-level");
const plants = document.querySelector(".plants");

let oxygenLevel = 100;
oxyLevel.textContent = "Oxygen Level: " + (oxygenLevel - co2RangeSlider.value) + "%";
co2Level.textContent = "CO2 Level: " + co2RangeSlider.value + "%";

let currentColor = [255, 255, 255]; // Start with white or your initial color
let animationFrame; // To track the animation so we can cancel it

co2RangeSlider.addEventListener("input", function () {
    co2Level.textContent = "CO2 Level: " + co2RangeSlider.value + "%";

    
    oxyLevel.textContent = "Oxygen Level: " + (oxygenLevel - co2RangeSlider.value) + "%";

    const max = Number(co2RangeSlider.max) || 100;
    const rangeValue = Number(co2RangeSlider.value);
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



// wow this just got so complicated
// if everything starts at 50% we're at balance (except h20, can start at 80 or something)
// if co2 slider increases 10% o2 level decreases accordingly, so 60 / 40
// less o2 means fewer animals and h20 also decreases, but Delayed 
// but increased co2 means plants increase at same rate as animal decrease
// as plants increase, so does 02, so ratio of co2 and o2 starts to reach 50/50 again

// so, if co2 increases, plants increase, but use color variable to step o2 up as color reaches new co2 target Number
// then, as o2 increases, either this example or manual slider change, animals and h20 increases
// ****** there might need to be a delay in plant growth depending on h20 level. h20 should start at 100..

// if h20 level slid to 0 then extant animals die quickly. no more h20 production. no more plants. we're mars.
// slide h20 to 10%. if co2 exists, plant growth increases slowly. 02 as well. h20 DECREASES slowly, but 
// as animals slowly appear they create h20. 
// BOTTOM LINE, h20 is static. it never changes unless the slider changes. 
// so, low level h20 means light color plants (few plants) and few animals. high level means high levels both 

// hmm so all life can exist with any level of water, but only scrubs. cactus and lizards, let's say
// more water means more vibrancy, more density so o2 and co2 exist in perfect inverse, but h20 dictates the density, or let's say opacity

// raise co2 = lower o2 immediately. raise and lower plants and animals more slowly
// then, even more slowly increase 02, and even slower than that, raise animals and co2

// but it has to be balanced so that after raising co2, and plants increse, followed by o2, that the o2 level 
// increases FASTER than animals, so o2 actually gets over 50%, then as animals and co2 increase, co2 overtakes o2 
// again, but less so, and so it goes like a see saw until they're back at 50%. maybe less dramatic than that. 
// a slight over correction followed by 50%. 