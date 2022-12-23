import Choices from "choices.js";
import Swiper, { Navigation, Pagination } from "swiper";

export const initCitySelector = () => {
  const cityChoices = new Choices(
    document.querySelector(".header__city-selector"),
    {
      itemSelectText: "",
      searchEnabled: false,
      allowHTML: true,
    }
  );
};

export const stdSelector = (selector) => {
  const categoryChoices = new Choices(
    document.querySelector(".header__category-selector"),
    {
      itemSelectText: "",
      searchEnabled: false,
      allowHTML: true,
    }
  );
};

export const autoSwiper = (
  selector,
  nextBtn,
  prevBtn,
  slides,
  media,
  space
) => {
  const swiper = new Swiper(selector, {
    loop: false,
    slidesPerView: slides,
    spaceBetween: space,
    direction: "horizontal",
    modules: [Navigation],
    navigation: {
      prevEl: nextBtn,
      nextEl: prevBtn,
    },
    breakpoints: {
      700: media["768"] || {},
      1000: media["1024"] || {},
      1400: media["1920"] || {},
    },
  });
};

export const initBurger = () => {
  const burgerMenu = document.querySelector(".header__nav-list");
  const burger = document.querySelector(".burger");

  document.querySelector(".burger").addEventListener("click", (e) => {
    document.body.classList.toggle("stop-scroll");
    e.currentTarget.classList.toggle("burger-active");

    if (e.currentTarget.classList.contains("burger-active")) {
      burgerMenu.classList.remove("menu-close");
      burgerMenu.classList.add("menu-active");
    } else {
      burgerMenu.classList.remove("menu-active");
      burgerMenu.classList.add("menu-close");
    }
  });

  document.querySelectorAll(".header__nav-item").forEach((el) => {
    el.addEventListener("click", () => {
      document.body.classList.remove("stop-scroll");
      burger.classList.remove("burger-active");
      burgerMenu.classList.remove("menu-active");
      burgerMenu.classList.add("menu-close");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) {
      burgerMenu.classList.remove("menu-close");
    }
  });
};

export const submitForm = (
  form,
  checkboxSelector,
  checkboxWrapperSelector,
  func
) => {
  form.querySelectorAll(".input-wrapper").forEach((el) => {
    const input = el.querySelector("input");
    const textError = el.querySelector("span");
    if (input.value.length === 0 && !input.classList.contains("error-input")) {
      textError.classList.add("error-block");
      input.classList.add("error-input");
    }
  });
  const checkbox = form.querySelector(`${checkboxSelector}:checked`);
  if (!form.querySelector(".error-input") && checkbox) {
    form.querySelectorAll("input").forEach((el) => {
      el.value = "";
      el.classList.remove("true-input");
    });
    func();
    return;
  }
  if (!checkbox)
    form.querySelector(checkboxWrapperSelector).classList.add("checkbox-error");
};

export const inputValidate = (e, errorText, validate) => {
  const value = e.currentTarget.value;
  const error = document.querySelector(errorText);
  if (validate(value)) {
    error.classList.remove("error-block");
    e.currentTarget.classList.add("true-input");
    e.currentTarget.classList.remove("error-input");
  } else {
    error.classList.add("error-block");
    e.currentTarget.classList.add("error-input");
    e.currentTarget.classList.remove("true-input");
  }
};

export const initSplashSwiper = (swiperSelector, pagination) => {
  const swiper = new Swiper(swiperSelector, {
    loop: true,
    modules: [Pagination],
    pagination: {
      el: pagination,
      type: "bullets",
      clickable: true,
    },
    a11y: {
      paginationBulletMessage: "Переход на слайд {{index}}",
    },
  });
};

export const lazyload = () => {
  const images = document.querySelectorAll("img")
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting) {
        entry.target.src = entry.target.getAttribute('data-src')
        entry.target.removeAttribute('data-src')
        observer.unobserve(entry.target)
      }
    })
  })
  images.forEach((img) => {
    observer.observe(img)
  });
};
