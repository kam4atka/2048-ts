import { ComponentInterface } from '../interface/component.interface';
import { createElement } from '../utils/create-element';

export default class Popup implements ComponentInterface {
  private componentElement!: HTMLElement;

  constructor(private message: string) {
    this.componentElement = this.getElement();
  }

  get() {
    return this.componentElement;
  }

  getTemplate(): string {
    return `
      <div class="popup">
        <div class="popup__message">${this.message}</div>
        <button class="popup__button" type="button">Start</button>
      </div>
      `;
  }

  getElement(): HTMLElement {
    return createElement(this.getTemplate());
  }

  setButtonHandler(cb: () => void) {
    const buttonElement = this.componentElement.querySelector('.popup__button');
    buttonElement?.addEventListener('click', cb);
  }

  remove() {
    this.componentElement.remove();
  }
}
