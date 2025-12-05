const BASE_URL = "https://open.er-api.com/v6/latest"

const dropdown = document.querySelectorAll(".from-to select");
const btn = document.querySelector("#btn");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");


for (select of dropdown) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode].toLowerCase();
  let newSrc = `https://flagcdn.com/48x36/${countryCode}.png`;
  let img = element.parentElement.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateRate();
});

const updateRate = async () => {
    let amount = document.querySelector("form input");
    let amtval = amount.value;
    console.log(amtval);
    const url = `${BASE_URL}/${fromcurr.value}`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data.rates[tocurr.value];
    let finalAmount = (amtval * rate).toFixed(2);
    msg.innerText = `${amtval}${fromcurr.value}=${finalAmount}${tocurr.value}`
}
window.addEventListener("load", () => {
    updateRate();
});