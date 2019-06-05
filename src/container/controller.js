export const onReload = () => {
  const map = document.querySelector('.map');
  document.querySelectorAll('.cell').forEach(el => {
    el.classList.remove('passed');
  });
  document.querySelector('.active').classList.remove('active');
  document.querySelector('.x0y0').classList.add('active');
  const mapClass = document
    .querySelector('.map')
    .className.match(/map-image-\d+/)[0];
  const num = Math.floor(Math.random() * 4 + 1);
  map.classList.remove(mapClass);
  map.classList.add(`map-image-${num}`);
};

export const onMove = directions => {
  directions = directions.trim().toLowerCase();
  let directionsTrimmed;
  if (/(up|down|right|left|restart)+/.test(directions)) {
    directionsTrimmed = directions.match(/(up|down|right|left|restart)+/)[0];
  }
  let x = document
    .querySelector('.active')
    .getAttribute('class')
    .match(/x\d+/)[0]
    .match(/\d+/)[0];
  let y = document
    .querySelector('.active')
    .getAttribute('class')
    .match(/y\d+/)[0]
    .match(/\d+/)[0];
  if (directionsTrimmed === 'up') {
    x = +x - 1;
  } else if (directionsTrimmed === 'down') {
    x = +x + 1;
  } else if (directionsTrimmed === 'right') {
    y = +y + 1;
  } else if (directionsTrimmed === 'left') {
    y = +y - 1;
  } else if (directionsTrimmed === 'restart') {
    onReload();
    return 'reloaded';
  }

  if (document.querySelector(`.x${x}y${y}`)) {
    document.querySelector('.active').classList.remove('active');
    document.querySelector(`.x${x}y${y}`).classList.add('active');
    document.querySelector(`.x${x}y${y}`).classList.add('passed');
  }
};
