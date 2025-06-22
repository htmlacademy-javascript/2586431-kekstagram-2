import { isEscapeKey } from './util';

class EscManager {
  static #instance = null;

  layers = [];

  constructor() {
    if (EscManager.#instance) {
      return EscManager.#instance;
    }
    EscManager.#instance = this;
    document.addEventListener('keydown', this._handle);
  }

  destroy() {
    document.removeEventListener('keydown', this._handle);
  }

  addLayer = (callback) => {
    this.layers.push(callback);
  };

  removeLayer = (callback) => {
    const index = this.layers.findIndex((value) => callback === value);
    if (index === -1) {
      return;
    }
    this.layers.splice(index, 1);
  };

  _handle = (evt) => {
    if (isEscapeKey(evt)) {
      const topLayer = this.layers.pop();
      if (!topLayer) {
        return;
      }
      evt.preventDefault();
      topLayer(evt);
    }
  };
}

export { EscManager };
