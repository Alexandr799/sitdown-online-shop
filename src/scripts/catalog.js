import { initCitySelector, stdSelector, initBurger, lazyload } from "./functions.js";
import List from "list.js";
import noUiSlider from "nouislider";

const initPanation = () => {
  let ListMebel;
  let items;
  window.addEventListener("DOMContentLoaded", () => {
    ListMebel = new List("catalog-wrapper", {
      page: window.innerWidth < 1000 ? 6 : 9,
      pagination: true,
      valueNames: ["catalog__item"],
    });
    items = ListMebel.items;
  });

  window.addEventListener("resize", () => {
    const lastCountPage = ListMebel.page;
    ListMebel.page = window.innerWidth < 1000 ? 6 : 9;
    if (lastCountPage != ListMebel.page) ListMebel.update();
  });
};

const sliderRangeInit = () => {
  const startSlider = document.getElementById("slider-range");
  const slider = noUiSlider.create(startSlider, {
    start: [50000, 150000],
    connect: true,
    range: {
      min: [0],
      max: [200000],
    },
  });

  const minInput = document.querySelector(".catalog__min-input");

  minInput.addEventListener("input", (e) => {
    slider.set([e.currentTarget.value, null]);
  });
  const maxInput = document.querySelector(".catalog__max-input");

  maxInput.addEventListener("input", (e) => {
    slider.set([null, e.currentTarget.value]);
  });

  slider.on("update", (values) => {
    minInput.value = parseInt(values[0]);
    maxInput.value = parseInt(values[1]);
  });
};

const initTag = ({ input, color, data, value }) => {
  const item = document.createElement("span");
  item.classList.add("filter-item-checked");
  item.style = `background-color:${color}`;
  item.setAttribute("data-value", data);
  const span = document.createElement("span");
  span.textContent = value;
  item.append(span);
  const button = document.createElement("button");
  button.classList.add("btn-reset");
  button.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.6 8.3999L8.40002 15.5999" stroke="#666666" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.40002 8.3999L15.6 15.5999" stroke="#666666" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  item.append(button);
  button.addEventListener("click", () => {
    if (item.getAttribute("data-value") === "price") {
      return (item.style.display = "none");
    }
    item.remove();
    if (input) input.checked = false;
  });
  return item;
};

const changeInputs = (input, container, color) => {
  if (input.checked) {
    container.append(
      initTag({
        input,
        color,
        data: input.getAttribute("data-value"),
        value: input.getAttribute("data-value"),
      })
    );
  } else {
    const val = input.getAttribute("data-value");
    container
      .querySelector(`.filter-item-checked[data-value="${val}"]`)
      .remove();
  }
};

const initWrapperFilterUI = () => {
  const filters = document.querySelectorAll(".wrapper-filter");
  filters.forEach((el) => {
    el.addEventListener("click", (e) => {
      if (e.selectorList) return;
      const active = el.classList.contains("wrapper-filter--active");
      filters.forEach((el) => {
        el.classList.remove("wrapper-filter--active");
      });

      if (active) {
        el.classList.remove("wrapper-filter--active");
      } else {
        el.classList.add("wrapper-filter--active");
      }
    });

    el.querySelector(".wrapper-filter__content").addEventListener(
      "click",
      (e) => {
        e.selectorList = true;
      }
    );
  });

  const containerSelector = document.querySelector(".catalog__checked-filter");

  const mebelSelector = document.querySelector(".type-mebel");
  const colorSelector = document.querySelector(".type-color");
  const saleSelector = document.querySelector(".type-sale");
  const inputMaxPrice = document.querySelector(".catalog__max-input");
  const inputMinPrice = document.querySelector(".catalog__min-input");

  mebelSelector.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", () => {
      changeInputs(input, containerSelector, "#DAFFD1");
    });
  });

  colorSelector.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", () => {
      changeInputs(input, containerSelector, "#EAEAEA");
    });
  });

  saleSelector.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", () => {
      changeInputs(input, containerSelector, "#EBD1FF");
    });
  });

  window.addEventListener("DOMContentLoaded", () => {
    const value = parseInt(inputMaxPrice.value);
    const tagPrice = initTag({
      input: false,
      color: "#FFF5D1",
      value: `до ${value}`,
      data: "price",
    });
    const count = tagPrice.querySelector("span");
    containerSelector.append(tagPrice);

    tagPrice.querySelector("button").addEventListener("click", () => {
      tagPrice.style.display = "none";
      inputMaxPrice.value = 0;
      inputMinPrice.value = 0;
    });

    if (value === 0) {
      tagPrice.style.display = "none";
    }

    inputMaxPrice.addEventListener("input", (e) => {
      console.log(parseInt(e.currentTarget.value));
      const val = parseInt(e.currentTarget.value);
      count.textContent = `до ${val}`;
      if (val === 0) {
        tagPrice.style.display = "none";
      } else if (val > 0) {
        tagPrice.style.display = "flex";
      }
    });
  });
};

const initmoreBnt = () => {
  window.addEventListener("DOMContentLoaded", () => {
    const btnsItem = document.querySelectorAll(".catalog__category-item-btn");
    btnsItem.forEach((item) => {
      const itemsCheck = item.parentElement.querySelectorAll(
        "li:not(.catalog__category-item-btn)"
      );
      const count = itemsCheck.length - 5;
      if (count < 1) {
        item.style.display = "none";
      } else {
        item.querySelector("button").textContent = `+ ещё ${count}`;
      }
      item.querySelector("button").addEventListener("click", () => {
        item.style.display = "none";
        itemsCheck.forEach((el) => {
          el.style.display = "block";
        });
      });
    });
  });
};
lazyload()
initBurger();
initCitySelector();
stdSelector(".header__category-selector");
initPanation();
sliderRangeInit();
initWrapperFilterUI();
initmoreBnt();
