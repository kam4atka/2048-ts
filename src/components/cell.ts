import { ComponentInterface } from '../interface/component.interface';
import { createElement } from '../utils/create-element';

export default class Cell implements ComponentInterface {
  private componentElement!: Element | null;

  constructor() {
    this.componentElement = this.getElement();
  }

  get () {
    return this.componentElement;
  }

  getTemplate() {
    return '<div class="cell"></div>';
  }

  getElement() {
    return createElement(this.getTemplate());
  }
}
