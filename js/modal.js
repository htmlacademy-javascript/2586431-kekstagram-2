import { isEscapeKey } from './util.js';

class Modal {
  constructor(modalElement, closeButtonElement, cfg) {
    this.modalElement = modalElement;
    this.closeButtonElement = closeButtonElement;
    this.onOpen = cfg?.onOpen;
    this.onClose = cfg?.onClose;

    this.closeButtonElement.addEventListener('click', () => {
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
    this.modalElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.onkeydown = this.onDocumentKeydown;
    this.onOpen?.();
  }

  close() {
    this.modalElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.onkeydown = undefined;
    this.onClose?.();
  }
}

export { Modal };
