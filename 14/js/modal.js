import { isEscapeKey } from './util.js';

class Modal {
  constructor(modalEl, closeBtnEl, cfg) {
    this.modalEl = modalEl;
    this.closeBtnEl = closeBtnEl;
    this.onOpen = cfg?.onOpen;
    this.onClose = cfg?.onClose;

    this.closeBtnEl.addEventListener('click', () => {
      this.close();
    });
  }

  onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.close();
    }
  };

  open() {
    this.modalEl.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.onkeydown = this.onDocumentKeydown;
    this.onOpen?.();
  }

  close() {
    this.modalEl.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.onkeydown = undefined;
    this.onClose?.();
  }
}

export { Modal };
