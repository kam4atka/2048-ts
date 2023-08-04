import { ComponentInterface } from '../interface/component.interface';
import Cell from './cell';
import Tile from './tile';
import { createElement } from '../utils/create-element';
import { render } from '../utils/render';

type BoardType = {
  cols: number,
  rows: number
}

export default class Board implements ComponentInterface {
  private cols!: number;
  private rows!: number;

  private boardEl!: Element | null;

  constructor({cols, rows}: BoardType, private rootEl: Element | null) {
    this.cols = cols;
    this.rows = rows;

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
      throw new Error('Failed to get root or board DOM element');
    }

    render(this.boardEl, this.rootEl);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.renderCell(this.boardEl);
      }
    }

    this.renderTile(this.boardEl);
  }

  renderCell(board: Element) {
    const cellComponent = new Cell();
    const cellEl = cellComponent.get();

    if (!cellEl) {
      throw new Error('Failed to get cell DOM element');
    }

    render(cellEl, board);
  }

  renderTile(board: Element) {
    const tileComponent = new Tile();
    const tileEl = tileComponent.get();

    if (!tileEl) {
      throw new Error('Failed to get tile DOM element');
    }

    render(tileEl, board);
  }
}
