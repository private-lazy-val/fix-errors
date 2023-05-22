// Desktop nav bar
const page = document.querySelector(".page");
const header = document.querySelector(".header");
const navNewsButton = document.querySelector(".navigation__item");
const navDropdownMenu = header.querySelector(
  ".navigation__dropdown-menu_hover"
);
const headerItemArrow = header.querySelector(".navigation__button_arrow");
// Desktop menu
const menu = document.querySelector(".menu");
const stickyHeader = document.querySelector(".sticky-header");
const openMenuButton = document.querySelector(
  ".sticky-header__open-menu-button"
);
const closeMenuButton = document.querySelector(".menu__close-button");
const popupNewsButton = document.querySelector(".navigation-button");
const popupDropdownMenu = menu.querySelector(
  ".navigation__dropdown-menu_click"
);
const menuItemArrow = menu.querySelector(".navigation__button_arrow");
// Mobile nav bar
const openMobileMenuButton = document.querySelector(
  ".mobile-header__open-menu-button"
);
// Slider
const slide = document.querySelector(".slide");
const sliderContainer = document.querySelector(".slider-content");
const sliderArrowLeft = document.querySelector(
  ".slider-navigation__arrow_left"
);
const sliderArrowRight = document.querySelector(
  ".slider-navigation__arrow_right"
);
// Checkboxes
const customCheckbox = document.querySelector(
  ".form__agreement-custom-checkbox"
);
const actualCheckbox = document.querySelector(".form__agreement-checkbox");

let currentPositionOfScroll = 0;

// Toggle sticky header
const toggleStickyHeader = () => {
  const isHeaderOutsideOfWindow =
    window.pageYOffset >= header.clientHeight - stickyHeader.clientHeight;

  if (isHeaderOutsideOfWindow) {
    stickyHeader.classList.remove("sticky-header_disable");
  } else {
    stickyHeader.classList.add("sticky-header_disable");
  }
};

// Toggle desktop menu
const toggleDesktopMenu = () => {
  const isMenuInsideOfHeader =
    window.pageYOffset <= header.clientHeight - stickyHeader.clientHeight;

  if (isMenuInsideOfHeader) {
    closeMenu();
  }
};

window.onscroll = () => {
  toggleStickyHeader();
  toggleDesktopMenu();
};

// Toggle scroll on mobile
const toggleScrollOnMobile = () => {
  if (window.innerWidth < 768) {
    closePopupDropDownMenu();
  }
};

// Close popup dropdown menu
const closePopupDropDownMenu = () => {
  popupDropdownMenu.classList.remove("dropdown-menu_click-open");
  menuItemArrow.classList.remove("navigation__button_arrow_up");
};

window.addEventListener("scroll", toggleScrollOnMobile);

// Toggle menu on desktop and mobile
const toggleMenu = () => {
  menu.classList.toggle("menu_open");
};

// Close popup
const closeMenu = () => {
  menu.classList.remove("menu_open");
};

openMenuButton.addEventListener("click", toggleMenu);
openMobileMenuButton.addEventListener("click", toggleMenu);
closeMenuButton.addEventListener("click", closeMenu);

page.addEventListener("click", function (e) {
  if (
    !openMenuButton.contains(e.target) &&
    !menu.contains(e.target) &&
    !openMobileMenuButton.contains(e.target)
  ) {
    closeMenu();
    togglePopupDropDownMenu();
  }
});

// Toggle dropdown menu in popup
const togglePopupDropDownMenu = () => {
  popupDropdownMenu.classList.toggle("dropdown-menu_click-open");
  menuItemArrow.classList.toggle("navigation__button_arrow_up");
};

// Toggle dropdown menu in nav
const toggleNavDropDownMenu = () => {
  navDropdownMenu.classList.toggle("dropdown-menu_click-open");
  headerItemArrow.classList.toggle("navigation__button_arrow_up");
};

popupNewsButton.addEventListener("click", togglePopupDropDownMenu);
navNewsButton.addEventListener("click", toggleNavDropDownMenu);

// Close dropdown menu in nav by clicking outside of the trigger element
const closeNavDropDownMenu = () => {
  navDropdownMenu.classList.remove("dropdown-menu_click-open");
  headerItemArrow.classList.remove("navigation__button_arrow_up");
};

page.addEventListener("click", function (e) {
  if (
    !navDropdownMenu.contains(e.target) &&
    !navNewsButton.contains(e.target)
  ) {
    closeNavDropDownMenu();
  }
});

customCheckbox.addEventListener("click", function () {
  // Toggle checked state of the actual checkbox
  actualCheckbox.checked = !actualCheckbox.checked;
});

const getMarginRightOfElement = (element) => {
  const slideMargin = window.getComputedStyle(slide).marginRight;
  const slideMarginWidth = parseInt(slideMargin.slice(0, -2));

  return slideMarginWidth;
};

const getWidthSlideWithMatgin = () => {
  const slideWidth = slide.clientWidth;
  const slideMargin = getMarginRightOfElement(slide);

  const slideWithMarginWidth = slideWidth + slideMargin;

  return slideWithMarginWidth;
};

const getSliderContentWidth = () => {
  const slideWidth = slide.clientWidth;
  const countOfSlides = document.querySelectorAll(".slide").length;
  const slideMarginWidth = getMarginRightOfElement(slide);

  const sliderContentWidth =
    (slideWidth + slideMarginWidth) * countOfSlides - slideMarginWidth;

  return sliderContentWidth;
};

const getEndPositionOfScroll = () => {
  const sliderContentWidth = getSliderContentWidth();

  const endPositionOfScroll = sliderContentWidth - sliderContainer.clientWidth;

  return endPositionOfScroll;
};

const getNewPositionOfScrollRight = () => {
  const endPositionOfScroll = getEndPositionOfScroll();
  const slideWithMarginWidth = getWidthSlideWithMatgin();
  const positionOfScrollBeforeLastSlide =
    endPositionOfScroll - slideWithMarginWidth;

  if (currentPositionOfScroll <= positionOfScrollBeforeLastSlide) {
    newPositionOfScroll = currentPositionOfScroll + slideWithMarginWidth;
  } else if (currentPositionOfScroll === endPositionOfScroll) {
    newPositionOfScroll = 0;
  } else {
    newPositionOfScroll = endPositionOfScroll;
  }

  return newPositionOfScroll;
};

const getNewPositionOfScrollLeft = () => {
  const endPositionOfScroll = getEndPositionOfScroll();
  const slideWithMarginWidth = getWidthSlideWithMatgin();

  if (currentPositionOfScroll > slideWithMarginWidth) {
    newPositionOfScroll = currentPositionOfScroll - slideWithMarginWidth;
  } else if (currentPositionOfScroll === 0) {
    newPositionOfScroll = endPositionOfScroll;
  } else {
    newPositionOfScroll = 0;
  }

  return newPositionOfScroll;
};

const changeIndicator = (currentPositionOfScroll) => {
  const endPositionOfScroll = getEndPositionOfScroll();

  var scrolled = (currentPositionOfScroll / endPositionOfScroll) * 100;
  document.getElementById("indicator").style.width = scrolled + "%";
};

const scrollSlider = (positionOfScroll) => {
  sliderContainer.scroll({
    left: positionOfScroll,
    behavior: "smooth",
  });

  currentPositionOfScroll = newPositionOfScroll;
};

const scrollRight = () => {
  newPositionOfScroll = getNewPositionOfScrollRight();

  scrollSlider(newPositionOfScroll);
  changeIndicator(newPositionOfScroll);
};

const scrollLeft = () => {
  newPositionOfScroll = getNewPositionOfScrollLeft();

  scrollSlider(newPositionOfScroll);
  changeIndicator(newPositionOfScroll);
};

sliderArrowLeft.addEventListener("click", scrollLeft);
sliderArrowRight.addEventListener("click", scrollRight);
