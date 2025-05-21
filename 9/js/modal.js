import { isEscapeKey } from './util';

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
    document.addEventListener('keydown', this.onDocumentKeydown);
    this.onOpen?.();
  }

  close() {
    this.modalEl.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', this.onDocumentKeydown);
    this.onClose?.();
  }
}

export { Modal };
