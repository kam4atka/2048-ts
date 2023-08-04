import { ComponentInterface } from '../interface/component.interface';
import Cell from './cell';
import Tile from './tile';
import { createElement } from '../utils/create-element';
import { render } from '../utils/render';

type BoardType = {
  cols: number,
  rows: number,
  rootEl: Element | null
}

export default class Board implements ComponentInterface {
  private cols!: number;
  private rows!: number;
  private rootEl!: Element | null;
  private boardEl!: Element | null;

  constructor({cols, rows, rootEl}: BoardType) {
    this.cols = cols;
    this.rows = rows;
    this.rootEl = rootEl;

    this.boardEl = this.getElement();
  }

  getTemplate() {
    return '<div class="board"></div>';
  }

  getElement() {
    return createElement(this.getTemplate());
  }

  init() {
    if (!this.rootEl || !this.boardEl) {
      throw new Error('Opps! [1]');
    }

    render(this.boardEl, this.rootEl);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const cellComponent = new Cell();
        const cellEl = cellComponent.get();

        if (!cellEl) {
          throw new Error('Oops! [2]');
        }

        render(cellEl, this.boardEl);
      }
    }

    const tileComponent = new Tile();
    const tileEl = tileComponent.get();

    if (!tileEl) {
      throw new Error('Oops! [3]');
    }

    render(tileEl, this.boardEl);
  }
}
