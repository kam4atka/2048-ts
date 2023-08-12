import CellModel from '../model/cell-model';
import ControllService from '../service/control-service';
import GameService from '../service/game-service';
import Board from '../components/board';
import Cell from '../components/cell';
import Tile from '../components/tile';
import Popup from '../components/popup';
import { getRandomValue } from '../utils/get-random-value';
import { render } from '../utils/render';
import { Keys } from '../const';

export default class BordPresenter {
  private rootEl!: HTMLElement;
  private boardEl!: HTMLElement;

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
  }

  init() {
    this.renderPopup();
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

    this.cellModel.getCollection().forEach((cell) => this.renderCell(cell));
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

  renderPopup() {
    const popupComponent = new Popup('Сlick to start');
    const popupEl = popupComponent.get();

    popupComponent.setButtonHandler(() => {
      this.renderBoard();
      popupComponent.remove();
    });

    render(popupEl, this.rootEl);
  }

  getEmptyCell() {
    const emptyCells = this.cellModel
      .getCollection()
      .filter((cell) => cell.isEmpty());
    return getRandomValue(emptyCells);
  }

  async moveUpHandler() {
    const groupedCells = this.cellModel.groupCollectionByColumn();

    if (this.gameService.canMove(groupedCells)) {
      await this.gameService.slideTiles(groupedCells);
      this.renderTile();
    }
  }

  async moveDownHandler() {
    const groupedCells = this.cellModel.groupCollectionByColumnReverse();

    if (this.gameService.canMove(groupedCells)) {
      await this.gameService.slideTiles(groupedCells);
      this.renderTile();
    }
  }

  async moveLeftHandler() {
    const groupedCells = this.cellModel.groupCollectionByRow();

    if (this.gameService.canMove(groupedCells)) {
      await this.gameService.slideTiles(groupedCells);
      this.renderTile();
    }
  }

  async moveRightHandler() {
    const groupedCells = this.cellModel.groupCollectionByRowReverse();

    if (this.gameService.canMove(groupedCells)) {
      await this.gameService.slideTiles(groupedCells);
      this.renderTile();
    }
  }
}
