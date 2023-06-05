"use strict";

const regions = [
  {
    id: 1,
    name: "Toshkent",
  },
  {
    id: 2,
    name: "Qarshi",
  },
  {
    id: 3,
    name: "Samarqand",
  },
  {
    id: 4,
    name: "Nukus",
  },
  {
    id: 5,
    name: "Xiva",
  },
  {
    id: 6,
    name: "Jizzax",
  },
  {
    id: 7,
    name: "Denov",
  },

  {
    id: 8,
    name: "Navoiy",
  },
  {
    id: 9,
    name: "Samarqand",
  },
  {
    id: 10,
    name: "Guliston",
  },
  {
    id: 11,
    name: "Farg'ona",
  },

  {
    id: 12,
    name: "Andijon",
  },
  {
    id: 13,
    name: "Namangan",
  },
];

const optionIcon = document.querySelector(".option");
const optionsList = document.querySelector(".options");
const selectedOption = document.querySelector(".selected");
const area = document.querySelector(".area");
const dateString = document.querySelector(".date");
const timeNow = document.querySelector(".time-now");
const tongTime = document.querySelector(".tong");
const quyoshTime = document.querySelector(".quyosh");
const peshinTime = document.querySelector(".peshin");
const asrTime = document.querySelector(".asr");
const shomTime = document.querySelector(".shom");
const xuftonTime = document.querySelector(".xufton");
const loader = document.querySelector(".loading");
const selectedRegion = document.querySelector(".selected-region");

const createOptionElement = (region) => {
  const element = createElement(
    "h1",
    "hover:bg-[#ffffff] px-[25px] py-1 rounded-md",
    `${region.name}`
  );
  element.setAttribute("id", region.id);
  return element;
};

const addRegion = () => {
  optionsList.innerHTML = "";
  regions.forEach((region) => {
    optionsList.append(createOptionElement(region));
  });
};
addRegion();

optionIcon.addEventListener("click", () => {
  optionsList.classList.toggle("-translate-y-96");
  optionsList.classList.toggle("hidden");
});

optionsList.addEventListener("click", (e) => {
  const id = e.target.id;
  searchRegion(id);
});

const searchRegion = (id) => {
  if (id) {
    loader.classList.toggle("hidden");
    regions.forEach((region) => {
      if (region.id == id) {
        optionsList.classList.toggle("-translate-y-96");
        optionsList.classList.toggle("hidden");
        getTimes(region.name);
      }
    });
  }
};

const months = [
  { title: null },
  { title: "yanvar" },
  { title: "fevral" },
  { title: "mart" },
  { title: "aprel" },
  { title: "may" },
  { title: "iyun" },
  { title: "iyul" },
  { title: "avgust" },
  { title: "sentabr" },
  { title: "oktabr" },
  { title: "noyabr" },
  { title: "dekabr" },
];

const getTimes = async (name) => {
  const url = `https://islomapi.uz/api/present/day?region=${name}`;
  const response = await fetch(url);
  const result = await response.json();
  console.log(result);
  innerHTML(result);
};

const innerHTML = (obj) => {
  loader.classList.toggle("hidden");
  selectedOption.innerHTML = obj.region;
  area.innerHTML = `${obj.region} shahri`;
  const date = obj.date.split("-");
  //   console.log(months[+date[1]]);
  //   console.log(date[2]);
  //   console.log(date[0]);
  dateString.innerHTML = `${date[2]}-${months[+date[1]].title} ${date[0]}-yil`;
  // console.log(new Date().toString().split(" "))
  timeNow.innerHTML = new Date().toString().split(" ")[4];
  tongTime.innerHTML = obj.times.tong_saharlik;
  quyoshTime.innerHTML = obj.times.quyosh;
  peshinTime.innerHTML = obj.times.peshin;
  asrTime.innerHTML = obj.times.asr;
  shomTime.innerHTML = obj.times.shom_iftor;
  xuftonTime.innerHTML = obj.times.hufton;
};

const oneTime = () => {
  searchRegion(1);
  optionsList.classList.add("-translate-y-96");
  optionsList.classList.add("hidden");
};

oneTime();
