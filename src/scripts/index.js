import isEmail from "validator/es/lib/isEmail";
import isMobilePhone from "validator/es/lib/isMobilePhone";
import isAlpha from "validator/es/lib/isAlpha";
import {
  initCitySelector,
  stdSelector,
  autoSwiper,
  initBurger,
  inputValidate,
  initSplashSwiper,
  submitForm,
  lazyload
} from "./functions.js";

initCitySelector();
stdSelector(".header__category-selector");
autoSwiper(
  ".specials__swiper",
  ".specials__prev-slide-btn",
  ".specials__next-slide-btn",
  "auto",
  {},
  32
);
autoSwiper(
  ".blog__swiper",
  ".blog__prev-slide-btn",
  ".blog__next-slide-btn",
  1,
  {
    768: { slidesPerView: 2, spaceBetween: 32 },
    1024: { slidesPerView: 3, spaceBetween: 32 },
    1920: { slidesPerView: 2, spaceBetween: 32 },
  },
  32
);
initSplashSwiper(".hero__swiper", ".swiper-pagination");
initBurger();
lazyload()

const feedbackForm = document.querySelector(".feedback__form");
feedbackForm
  .querySelector('input[name="user_name"]')
  .addEventListener("input", (e) => {
    inputValidate(e, ".name-input-error", (value) => {
      return isAlpha(value) || isAlpha(value, ["ru-RU"]);
    });
  });

feedbackForm
  .querySelector('input[name="user_telephone"]')
  .addEventListener("input", (e) => {
    inputValidate(e, ".tel-input-error", (value) => {
      return isMobilePhone(value, ["ru-RU"]);
    });
  });

feedbackForm
  .querySelector('input[name="user_email"]')
  .addEventListener("input", (e) => {
    inputValidate(e, ".mail-input-error", isEmail);
  });

feedbackForm.addEventListener("submit", (e) => {
  e.preventDefault();
  submitForm(
    e.currentTarget,
    ".feedback__checkbox",
    ".feedback__checkbox-wrapper",
    () => {
      const modal = document.querySelector(".thanks-wrapper");
      modal.classList.add("modal--active");
      modal.querySelector(".thanks__close").addEventListener("click", () => {
        modal.classList.remove("modal--active");
      });
    }
  );
});

feedbackForm
  .querySelector(".feedback__checkbox-wrapper")
  .addEventListener("click", (e) => {
    e.currentTarget.classList.remove("checkbox-error");
  });

document.querySelector(".best__more-btn").addEventListener("click", (e) => {
  const items = document.querySelectorAll(".best__item");
  items.forEach((el) => {
    el.style.display = "block";
  });
  e.currentTarget.style.display = "none";
});
