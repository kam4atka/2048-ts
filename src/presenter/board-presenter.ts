import CellModel from '../model/cell-model';
import Board from '../components/board';
import Cell from '../components/cell';
import Tile from '../components/tile';
import { getRandomValue } from '../utils/get-random-value';
import { render } from '../utils/render';


type BoardType = {
  cols: number,
  rows: number
}

export default class BordPresenter {
  private cols!: number;
  private rows!: number;

  private boardEl!: Element | null;

  constructor({cols, rows}: BoardType, private rootEl: Element | null, private cellModel: CellModel) {
    this.cols = cols;
    this.rows = rows;

    this.boardEl = new Board().getElement();
  }

  init() {
    if (!this.rootEl || !this.boardEl) {
      throw new Error('Failed to get root or board DOM element');
    }

    render(this.boardEl, this.rootEl);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.renderCell(this.boardEl, i, j);
      }
    }

    this.renderTile(this.boardEl);
  }

  renderCell(board: Element, x: number, y: number) {
    const cellComponent = new Cell(x, y);
    const cellEl = cellComponent.get();

    this.cellModel.set(cellComponent);

    if (!cellEl) {
      throw new Error('Failed to get cell DOM element');
    }

    render(cellEl, board);
  }

  renderTile(board: Element) {
    const {x, y} = this.getEmptyCell().getCoords();

    const tileComponent = new Tile();
    tileComponent.setPosition(x, y);
    tileComponent.setColor();
    const tileEl = tileComponent.get();

    if (!tileEl) {
      throw new Error('Failed to get tile DOM element');
    }

    render(tileEl, board);
  }

  getEmptyCell() {
    const emptyCells = this.cellModel
      .getCollection()
      .filter((cell) => cell.isEmpty());
    return getRandomValue(emptyCells);
  }
}
