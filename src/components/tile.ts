import { ComponentInterface } from '../interface/component.interface';
import { createElement } from '../utils/create-element';

export default class Tile implements ComponentInterface {
  private value!: number;
  private componentElement!: HTMLElement;

  private x!: number;
  private y!: number;

  constructor() {
    this.value = Math.random() > 0.5 ? 2 : 4;
    this.componentElement = this.getElement();
  }

  get () {
    return this.componentElement;
  }

  getTemplate() {
    return `<div class="tile">${this.value}</div>`;
  }

  getElement() {
    return createElement(this.getTemplate());
  }

  setValue(tileValue: number) {
    this.value = tileValue;
  }

  setColor() {
    const bgLightness = 100 - Math.log2(this.value) * 9;

    this.componentElement.style.setProperty('--bg-lightness', `${bgLightness}%`);
    this.componentElement.style.setProperty('--text-lightness', `${bgLightness < 50 ? 90 : 10}%`);
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.componentElement.style.setProperty('--x', String(this.x));
    this.componentElement.style.setProperty('--y', String(this.y));
  }
}
