import CellModel from '../model/cell-model';
import Board from '../components/board';
import Cell from '../components/cell';
import Tile from '../components/tile';
import { getRandomValue } from '../utils/get-random-value';
import { render } from '../utils/render';

export default class BordPresenter {
  private rootEl!: HTMLElement;
  private boardEl!: HTMLElement;

  private cells: Cell[] = [];

  constructor(private cellModel: CellModel, rootEl: HTMLElement | null) {
    if (!rootEl) {
      throw new Error('Failed to get root DOM element');
    }

    this.rootEl = rootEl;

    this.boardEl = new Board().getElement();
    this.cells = this.cellModel.getCollection();
  }

  init() {
    this.renderBoard();
  }

  renderBoard() {
    render(this.boardEl, this.rootEl);

    this.cells.forEach((cell) => this.renderCell(cell));
    this.renderTile();
  }

  renderCell(cell: Cell) {
    const cellElement = cell.get();
    render(cellElement, this.boardEl);
  }

  renderTile() {
    const {x, y} = this.getEmptyCell().getCoords();

    const tileComponent = new Tile();
    tileComponent.setPosition(x, y);
    tileComponent.setColor();
    const tileEl = tileComponent.get();

    render(tileEl, this.boardEl);
  }

  getEmptyCell() {
    const emptyCells = this.cells.filter((cell) => cell.isEmpty());
    return getRandomValue(emptyCells);
  }
}
