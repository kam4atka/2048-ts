import { ComponentInterface } from '../interface/component.interface';
import { createElement } from '../utils/create-element';

export default class Cell implements ComponentInterface {
  private componentElement!: Element | null;

  private x = 0;
  private y = 0;

  constructor(x: number, y: number) {
    this.componentElement = this.getElement();

    this.x = x;
    this.y = y;
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

  getCoordsByString() {
    return `${this.x}${this.y}`;
  }
}
