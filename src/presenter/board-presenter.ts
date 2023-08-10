import CellModel from '../model/cell-model';
import ControllService from '../service/control-service';
import GameService from '../service/game-service';
import Board from '../components/board';
import Cell from '../components/cell';
import Tile from '../components/tile';
import { getRandomValue } from '../utils/get-random-value';
import { render } from '../utils/render';
import { Keys } from '../const';

export default class BordPresenter {
  private rootEl!: HTMLElement;
  private boardEl!: HTMLElement;

  private cells: Cell[] = [];

  constructor(
    private controllService: ControllService,
    private gameService: GameService,
    private cellModel: CellModel,
    rootEl: HTMLElement | null
  ) {
    if (!rootEl) {
      throw new Error('Failed to get root DOM element');
    }
    this.bindLocalHandlers();
    this.setOuterHandlers();

    this.rootEl = rootEl;

    this.boardEl = new Board().getElement();
    this.cells = this.cellModel.getCollection();
  }

  init() {
    this.renderBoard();
  }

  bindLocalHandlers() {
    this.moveUpHandler = this.moveUpHandler.bind(this);
  }

  setOuterHandlers() {
    // eslint-disable-next-line
    this.controllService.setHandler(Keys.Up, this.moveUpHandler);
  }

  renderBoard() {
    render(this.boardEl, this.rootEl);

    this.cells.forEach((cell) => this.renderCell(cell));
    this.renderTile();
    this.renderTile();
  }

  renderCell(cell: Cell) {
    const cellElement = cell.get();
    render(cellElement, this.boardEl);
  }

  renderTile() {
    const cell = this.getEmptyCell();
    const {x, y} = cell.getCoords();

    const tileComponent = new Tile();
    tileComponent.setPosition(x, y);
    tileComponent.setColor();

    cell.linkTile(tileComponent);

    const tileEl = tileComponent.get();
    render(tileEl, this.boardEl);
  }

  getEmptyCell() {
    const emptyCells = this.cells.filter((cell) => cell.isEmpty());
    return getRandomValue(emptyCells);
  }

  moveUpHandler() {
    this.gameService.slideTiles(this.cells);
  }
}
