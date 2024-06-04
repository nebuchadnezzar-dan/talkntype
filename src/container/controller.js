export const onReload = () => {
  const map = document.querySelector(".map");
  document.querySelectorAll(".cell").forEach((el) => {
    el.classList.remove("passed");
  });
  document.querySelector(".active").classList.remove("active");
  document.querySelector(".x0y0").classList.add("active");
  const mapClass = document
    .querySelector(".map")
    .className.match(/map-image-\d+/)[0];
  const num = Math.floor(Math.random() * 4 + 1);
  map.classList.remove(mapClass);
  map.classList.add(`map-image-${num}`);
};

// export
