const rangeSlider = document.querySelector("#oxygen");
const oxygenLevel = document.querySelector(".oxy-level");

rangeSlider.addEventListener("input", function () {
    oxygenLevel.textContent = "Current value: " + rangeSlider.value;
  });