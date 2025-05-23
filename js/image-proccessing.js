import '../vendor/nouislider/nouislider.js';
import '../vendor/nouislider/nouislider.css';

const fieldScaleControl = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const imgPreview = document.querySelector('.img-upload__preview');

const effectSliderContainer = document.querySelector(
  '.img-upload__effect-level'
);
const effectSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectNoneButton = document.getElementById('effect-none');
const effectChromeButton = document.getElementById('effect-chrome');
const effectSepiaButton = document.getElementById('effect-sepia');
const effectMarvinButton = document.getElementById('effect-marvin');
const effectPhobosButton = document.getElementById('effect-phobos');
const effectHeatButton = document.getElementById('effect-heat');

const effectButtons = {
  none: effectNoneButton,
  chrome: effectChromeButton,
  sepia: effectSepiaButton,
  marvin: effectMarvinButton,
  phobos: effectPhobosButton,
  heat: effectHeatButton,
};

const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;
const SCALE_DEFAULT = parseFloat(fieldScaleControl.value);

let scale = SCALE_DEFAULT;
const setScale = (value) => {
  scale = Math.max(Math.min(value, SCALE_MAX), SCALE_MIN);
  fieldScaleControl.value = `${scale}%`;
  imgPreview.style.transform = `scale(${scale}%)`;
};

noUiSlider.create(effectSlider, {
  start: 100,
  connect: [true, false],
  range: {
    min: 0,
    max: 100,
  },
});

let intensity = 100;
let effect = 'none';

const updateEffect = () => {
  switch (effect) {
    case 'chrome':
      imgPreview.style.filter = `grayscale(${intensity / 100})`;
      break;
    case 'sepia':
      imgPreview.style.filter = `sepia(${intensity / 100})`;
      break;
    case 'marvin':
      imgPreview.style.filter = `invert(${intensity}%)`;
      break;
    case 'phobos':
      imgPreview.style.filter = `blur(${(intensity / 100) * 3}px)`;
      break;
    case 'heat':
      imgPreview.style.filter = `brightness(${(intensity / 100) * 2 + 1})`;
      break;
    case 'none':
    default:
      imgPreview.style.filter = 'none';
  }
};

const setIntensity = (value) => {
  effectSlider.noUiSlider.set(value);
};
effectSlider.noUiSlider.on('update', () => {
  intensity = effectSlider.noUiSlider.get();
  effectLevelValue.value = intensity;
  updateEffect();
});

const setEffect = (value) => {
  effect = value && value in effectButtons ? value : 'none';
  if (effect === 'none') {
    effectSliderContainer.style.display = 'none';
  } else {
    effectSliderContainer.style.display = 'unset';
  }
  Object.entries(effectButtons).forEach(([key, button]) => {
    button.checked = value === key;
  });
  setIntensity(100);
};

const initialize = () => {
  scaleSmaller.onclick = function () {
    setScale(scale - SCALE_STEP);
  };

  scaleBigger.onclick = function () {
    setScale(scale + SCALE_STEP);
  };

  Object.entries(effectButtons).forEach(([key, button]) => {
    button.onclick = () => {
      setEffect(key);
    };
  });

  setEffect('none');
};

const reset = () => {
  setScale(SCALE_DEFAULT);
  setEffect('none');
};

export { initialize, reset };
