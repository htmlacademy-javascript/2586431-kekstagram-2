import { EscManager } from './esc-manager.js';

const escManager = new EscManager();

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

  open = () => {
    this.modalElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    escManager.addLayer(this.close);
    this.onOpen?.();
  };

  close = () => {
    this.modalElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    escManager.removeLayer(this.close);
    this.onClose?.();
  };
}

export { Modal };
