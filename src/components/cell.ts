import { ComponentInterface } from '../interface/component.interface';
import Tile from './tile';
import { createElement } from '../utils/create-element';

export default class Cell implements ComponentInterface {
  private componentElement!: HTMLElement;

  private x = 0;
  private y = 0;

  private tile!: Tile;

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

  getCoords() {
    return {x: this.x, y: this.y};
  }

  getCoordsByString() {
    return `${this.x}${this.y}`;
  }

  linkTile(tile: Tile) {
    this.tile = tile;
  }

  isEmpty() {
    return (!this.tile);
  }
}
