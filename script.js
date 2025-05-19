const rangeSlider = document.querySelector("#oxygen");
const oxygenLevel = document.querySelector(".oxy-level");




const plants = document.querySelector(".plants");

rangeSlider.addEventListener("input", function () {
    oxygenLevel.textContent = "Oxygen Level: " + rangeSlider.value;

    const max = Number(rangeSlider.max) || 100; // fallback if max not set
    const rangeValue = rangeSlider.value;
    const color1 = 255 - Math.round((rangeValue / max) * 200); // 255 to 55
    const color2 = 255 - Math.round((rangeValue / max) * 200); // 255 to 55

    plants.style.backgroundColor = `rgb(${color1}, 255, ${color2})`
    
  });



