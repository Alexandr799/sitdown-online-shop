import {
  initCitySelector,
  stdSelector,
  initBurger,
  autoSwiper,
  inputValidate,
  submitForm,
  lazyload,
} from "./functions.js";
import isMobilePhone from "validator/es/lib/isMobilePhone";
import isAlpha from "validator/es/lib/isAlpha";

const initOpenCart = () => {
  autoSwiper(
    ".open-cart__swiper",
    ".open-cart__prev",
    ".open-cart__next",
    1,
    {
      768: { slidesPerView: 2, spaceBetween: 16 },
      1024: { slidesPerView: 3, spaceBetween: 16 },
      1920: { slidesPerView: 4, spaceBetween: 16 },
    },
    0
  );
  document.querySelector(".main__head").addEventListener("click", () => {
    const modal = document.querySelector(".open-cart-wrapper");
    const modalDefault = document.querySelector(".open-cart").cloneNode(true);
    modal.classList.add("modal--active");

    const head = document.querySelector(".open-cart__head-img");
    const smallImgAll = document.querySelectorAll(".open-cart__slide-img");
    smallImgAll.forEach((pic) => {
      pic.addEventListener("click", () => {
        const img = pic.querySelector("img").cloneNode(true);
        const headImg = head.querySelector("img").cloneNode(true);
        pic.replaceChildren(headImg);
        head.replaceChildren(img);
      });
    });

    modal.querySelector(".open-cart__close").addEventListener("click", () => {
      modal.classList.remove("modal--active");
      modal.replaceChildren(modalDefault);
    });
  });
};

const initOneClickBuy = () => {
  const modal = document.querySelector(".buy-form-wrapper");
  document.querySelector(".main__head-btn").addEventListener("click", () => {
    modal.classList.add("modal--active");
  });

  const form = document.querySelector(".buy-form");
  form
    .querySelector('input[name="user_name"]')
    .addEventListener("input", (e) => {
      inputValidate(e, ".name-input-error", (value) => {
        return isAlpha(value) || isAlpha(value, ["ru-RU"]);
      });
    });

  form
    .querySelector('input[name="telephone"]')
    .addEventListener("input", (e) => {
      inputValidate(e, ".tel-input-error", (value) => {
        return isMobilePhone(value, ["ru-RU"]);
      });
    });

  form.querySelector(".buy-form__close").addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("modal--active");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (e.currentTarget.classList.contains("buy-form__close")) return;
    submitForm(
      form,
      ".buy-form__checkbox",
      ".buy-form__checkbox-wrapper",
      () => {
        modal.classList.remove("modal--active");
        document
          .querySelector(".thanks-wrapper")
          .classList.add(".modal--active");
        const newModal = document.querySelector(".thanks-wrapper");
        newModal.classList.add("modal--active");

        newModal
          .querySelector(".thanks__close")
          .addEventListener("click", () => {
            newModal.classList.remove("modal--active");
          });
      }
    );
  });

  form
    .querySelector(".buy-form__checkbox-wrapper")
    .addEventListener("click", (e) => {
      e.currentTarget.classList.remove("checkbox-error");
    });
};

initBurger();
initCitySelector();
stdSelector(".header__category-selector");
autoSwiper(
  ".cart__swiper",
  ".cart__prev",
  ".cart__next",
  "auto",
  {
    768: { direction: "vertical" },
    1024: { direction: "horizontal" },
    1920: { spaceBetween: 30 },
  },
  16
);
autoSwiper(
  ".dop__swiper",
  ".dop__prev",
  ".dop__next",
  2,
  {
    768: { slidesPerView: 2, spaceBetween: 32 },
    1024: { slidesPerView: 3, spaceBetween: 32 },
    1920: { slidesPerView: 4, spaceBetween: 32 },
  },
  16
);
initOpenCart();
initOneClickBuy();
lazyload();
