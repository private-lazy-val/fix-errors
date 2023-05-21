const header = document.querySelector(".header");
const stickyHeader = document.querySelector(".sticky-header");
let currentPositionOfScroll = 0;
const slide = document.querySelector(".slide");
const sliderContainer = document.querySelector(".slider-content");
const openMenuButton = document.querySelector(".sticky-header__open-menu-button");
const closeMenuButton = document.querySelector(".menu__close-button");
const openMobileMenuButton = document.querySelector(".mobile-header__open-menu-button");
const sliderArrowLeft = document.querySelector(".slider-navigation__arrow_left");
const sliderArrowRight = document.querySelector(".slider-navigation__arrow_right");
const buttonToNews = document.querySelector(".navigation-button");
const menu = document.querySelector(".menu");
const page = document.querySelector(".page");

const toggleStickyHeader = () => {
  const isHeaderOutsideOfWindow = window.pageYOffset >= header.clientHeight - stickyHeader.clientHeight;

  if (isHeaderOutsideOfWindow) {
    stickyHeader.classList.remove("sticky-header_disable");
  } else {
    stickyHeader.classList.add("sticky-header_disable");
  }
}

const toggleDesktopMenu = () => {
  const isMenuInsideOfHeader = window.pageYOffset <= header.clientHeight - stickyHeader.clientHeight;

  if (isMenuInsideOfHeader) {
    closeMenu();
  }
}

window.onscroll = () => {
  toggleStickyHeader();
  toggleDesktopMenu();
};

const toggleScrollOnMobile = () => {
  page.classList.toggle("page_scroll_off");
}

const toggleMenu = () => {
  const screenWidth = window.screen.width;

  if (screenWidth < 768) {
    toggleScrollOnMobile();
  }

  menu.classList.add("menu_open");
}

const closeMenu = () => {
  menu.classList.remove("menu_open");
}

openMenuButton.addEventListener("click", toggleMenu);
openMobileMenuButton.addEventListener("click", toggleMenu);
closeMenuButton.addEventListener("click", toggleMenu);

const openDropDownMenu = () => {
  const dropdownMenuNews = document.querySelector(".navigation__dropdown-menu_click");
  const menuItemArrow = document.querySelector(".navigation-button.navigation__button_arrow");

  dropdownMenuNews.classList.toggle("dropdown-menu_click-open");
  menuItemArrow.classList.toggle("navigation__button_arrow_up");
}

buttonToNews.addEventListener("click", openDropDownMenu)

const getMarginRightOfElement = (element) => {
  const slideMargin = window.getComputedStyle(slide).marginRight;
  const slideMarginWidth = parseInt(slideMargin.slice(0, -2));

  return slideMarginWidth;
}

const getWidthSlideWithMatgin = () => {
  const slideWidth = slide.clientWidth;
  const slideMargin = getMarginRightOfElement(slide);

  const slideWithMarginWidth = slideWidth + slideMargin;

  return slideWithMarginWidth;
}

const getSliderContentWidth = () => {
  const slideWidth = slide.clientWidth;
  const countOfSlides = document.querySelectorAll(".slide").length;
  const slideMarginWidth = getMarginRightOfElement(slide);

  const sliderContentWidth = (slideWidth + slideMarginWidth) * countOfSlides - slideMarginWidth;

  return sliderContentWidth;
}

const getEndPositionOfScroll = () => {
  const sliderContentWidth = getSliderContentWidth();

  const endPositionOfScroll = sliderContentWidth - sliderContainer.clientWidth;

  return endPositionOfScroll;
}

const getNewPositionOfScrollRight = () => {
  const endPositionOfScroll = getEndPositionOfScroll();
  const slideWithMarginWidth = getWidthSlideWithMatgin();
  const positionOfScrollBeforeLastSlide = endPositionOfScroll - slideWithMarginWidth;

  if (currentPositionOfScroll <= positionOfScrollBeforeLastSlide) {
    newPositionOfScroll = currentPositionOfScroll + slideWithMarginWidth;
  }
  else if (currentPositionOfScroll === endPositionOfScroll) {
    newPositionOfScroll = 0;
  }
  else {
    newPositionOfScroll = endPositionOfScroll;
  }

  return newPositionOfScroll;
}

const getNewPositionOfScrollLeft = () => {
  const endPositionOfScroll = getEndPositionOfScroll();
  const slideWithMarginWidth = getWidthSlideWithMatgin();

  if (currentPositionOfScroll > slideWithMarginWidth) {
    newPositionOfScroll = currentPositionOfScroll - slideWithMarginWidth;
  }
  else if (currentPositionOfScroll === 0) {
    newPositionOfScroll = endPositionOfScroll;
  }
  else {
    newPositionOfScroll = 0;
  }

  return newPositionOfScroll;
}

const changeIndicator = (currentPositionOfScroll) => {
  const endPositionOfScroll = getEndPositionOfScroll();

  var scrolled = (currentPositionOfScroll / endPositionOfScroll) * 100;
  document.getElementById("indicator").style.width = scrolled + "%";
}

const scrollSlider = (positionOfScroll) => {
  sliderContainer.scroll({
    left: positionOfScroll,
    behavior: 'smooth'
  });

  currentPositionOfScroll = newPositionOfScroll;
}

const scrollRight = () => {
  newPositionOfScroll = getNewPositionOfScrollRight();

  scrollSlider(newPositionOfScroll);
  changeIndicator(newPositionOfScroll);
}

const scrollLeft = () => {
  newPositionOfScroll = getNewPositionOfScrollLeft();

  scrollSlider(newPositionOfScroll);
  changeIndicator(newPositionOfScroll);
}

sliderArrowLeft.addEventListener("click", scrollLeft);
sliderArrowRight.addEventListener("click", scrollLeft);
