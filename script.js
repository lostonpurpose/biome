const co2RangeSlider = document.querySelector("#co2");
const oxyRangeSlider = document.querySelector("#oxy")
const co2Level = document.querySelector(".co2-level");
const oxyLevel = document.querySelector(".oxy-level");
const plants = document.querySelector(".plants");
const atmos = document.querySelector(".atmos");

let oxygenLabel = 100;
oxyLevel.textContent = "Oxygen Level: " + (oxygenLabel - co2RangeSlider.value) + "%";
co2Level.textContent = "CO2 Level: " + co2RangeSlider.value + "%";

let co2CurrentColor = [255, 255, 255]; // Start with white or your initial color
let oxyCurrentColor = [255, 255, 255]; // Start with white or your initial color

let animationFrame; // To track the animation so we can cancel it

// func to take in oxy or co2 slider and change opposite
function updateSliders(source) {
    // make sliders always add up to 100

    if (source === "co2") {
        oxyRangeSlider.value = 100 - co2RangeSlider.value;
    }
    else if (source === "oxy") {
        co2RangeSlider.value = 100 - oxyRangeSlider.value;
    }
    co2Level.textContent = "CO2 Level: " + co2RangeSlider.value + "%";
    oxyLevel.textContent = "O2 Level: " + (oxygenLabel - co2RangeSlider.value) + "%";

    // animation code
    const co2Max = Number(co2RangeSlider.co2Max) || 100;
    const oxyMax = Number(co2RangeSlider.co2Max) || 100;
    const co2RangeValue = Number(co2RangeSlider.value);
    const oxyRangeValue = Number(oxyRangeSlider.value);

    // co2 colors
    const co2Color1 = 255 - Math.round((co2RangeValue / co2Max) * 255);
    const co2Color2 = 255 - Math.round((co2RangeValue / co2Max) * 250);

    let co2Color3 = 255;
    if (co2RangeValue >= 50) {
        const t = (co2RangeValue - 50) / (co2Max - 50);
        co2Color3 = Math.round(255 - (t * 150));
    }

    const co2TargetColor = [co2Color1, co2Color3, co2Color2];
    // end co2 colors

// atmos colors
const white = [255, 255, 255];
const darkBlue = [0, 89, 173]; // Your desired dark blue at 100%

const t = oxyRangeValue / oxyMax; // 0 at min, 1 at max

const oxyColor1 = Math.round(white[0] + (darkBlue[0] - white[0]) * t);
const oxyColor2 = Math.round(white[1] + (darkBlue[1] - white[1]) * t);
const oxyColor3 = Math.round(white[2] + (darkBlue[2] - white[2]) * t);

const oxyTargetColor = [oxyColor1, oxyColor2, oxyColor3];
    // end atmos colors

    if (animationFrame) cancelAnimationFrame(animationFrame);

    const steps = 200;
    let step = 0;
    const co2StartColor = [...co2CurrentColor];
    const oxyStartColor = [...oxyCurrentColor];

    // animation function
    function animate() {
        step++;
        const progress = step / steps;
        // Interpolate each color channel for co2
        const co2R = Math.round(co2StartColor[0] + (co2TargetColor[0] - co2StartColor[0]) * progress);
        const co2G = Math.round(co2StartColor[1] + (co2TargetColor[1] - co2StartColor[1]) * progress);
        const co2B = Math.round(co2StartColor[2] + (co2TargetColor[2] - co2StartColor[2]) * progress);
        // Interpolate each color channel for atmos
        const oxyR = Math.round(oxyStartColor[0] + (oxyTargetColor[0] - oxyStartColor[0]) * progress);
        const oxyG = Math.round(oxyStartColor[1] + (oxyTargetColor[1] - oxyStartColor[1]) * progress);
        const oxyB = Math.round(oxyStartColor[2] + (oxyTargetColor[2] - oxyStartColor[2]) * progress);

        
        plants.style.backgroundColor = `rgb(${co2R}, ${co2G}, ${co2B})`;
        atmos.style.backgroundColor = `rgb(${oxyR}, ${oxyG}, ${oxyB})`;

        if (step < steps) {
            animationFrame = requestAnimationFrame(animate);
        } 
        else if (source === "co2") {
            co2CurrentColor = co2TargetColor;
        }
        else if (source === "oxy") {
            oxyCurrentColor = oxyTargetColor;
        }
    }
    // end of use 'source' to change co2 or oxy

    animate();
};

co2RangeSlider.addEventListener('input', () => updateSliders("co2"));
oxyRangeSlider.addEventListener('input', () => updateSliders("oxy"));

// Initialize everything on page load
updateSliders("co2");
updateSliders("oxy");

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