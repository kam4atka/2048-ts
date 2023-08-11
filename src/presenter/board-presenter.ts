import CellModel from '../model/cell-model';
import ControllService from '../service/control-service';
import GameService from '../service/game-service';
import Board from '../components/board';
import Cell from '../components/cell';
import Tile from '../components/tile';
import { getRandomValue } from '../utils/get-random-value';
import { render } from '../utils/render';
import { Direction, Keys } from '../const';

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
    this.moveDownHandler = this.moveDownHandler.bind(this);
    this.moveLeftHandler = this.moveLeftHandler.bind(this);
    this.moveRightHandler = this.moveRightHandler.bind(this);
  }

  setOuterHandlers() {
    // eslint-disable-next-line
    this.controllService.setHandler(Keys.Up, this.moveUpHandler);
    // eslint-disable-next-line
    this.controllService.setHandler(Keys.Down, this.moveDownHandler);
    // eslint-disable-next-line
    this.controllService.setHandler(Keys.Left, this.moveLeftHandler);
    // eslint-disable-next-line
    this.controllService.setHandler(Keys.Right, this.moveRightHandler);
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

  async moveUpHandler() {
    await this.gameService.slideTiles(Direction.Up, this.cells);
    this.renderTile();
  }

  async moveDownHandler() {
    await this.gameService.slideTiles(Direction.Down, this.cells);
    this.renderTile();
  }

  async moveLeftHandler() {
    await this.gameService.slideTiles(Direction.Left, this.cells);
    this.renderTile();
  }

  async moveRightHandler() {
    await this.gameService.slideTiles(Direction.Right, this.cells);
    this.renderTile();
  }
}
