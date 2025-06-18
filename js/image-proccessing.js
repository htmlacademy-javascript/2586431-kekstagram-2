const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;
const SCALE_DEFAULT = 100;

const fieldScaleControl = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const imgPreview = document.querySelector('.img-upload__preview > img');
const effectsPreviews = [...document.querySelectorAll('.effects__preview')];

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

const effectSliderConfigs = {
  none: {},
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
  },
};

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
      imgPreview.style.filter = `grayscale(${intensity})`;
      break;
    case 'sepia':
      imgPreview.style.filter = `sepia(${intensity})`;
      break;
    case 'marvin':
      imgPreview.style.filter = `invert(${intensity}%)`;
      break;
    case 'phobos':
      imgPreview.style.filter = `blur(${intensity}px)`;
      break;
    case 'heat':
      imgPreview.style.filter = `brightness(${intensity})`;
      break;
    case 'none':
    default:
      imgPreview.style.filter = 'none';
  }
};

effectSlider.noUiSlider.on('update', () => {
  intensity = effectSlider.noUiSlider.get();
  effectLevelValue.value = Number(intensity);
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
  const config = effectSliderConfigs[effect];
  if (!config?.range) {
    updateEffect();
    return;
  }
  effectSlider.noUiSlider.updateOptions(config);
  effectSlider.noUiSlider.set(config.range.max);
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

const setImage = (file) => {
  if (file) {
    const blob = URL.createObjectURL(file);
    imgPreview.src = blob;
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${blob})`;
    });
  } else {
    imgPreview.src = '#';
  }
};

const reset = () => {
  setImage();
  setScale(SCALE_DEFAULT);
  setEffect('none');
};

export { initialize, reset, setImage };
