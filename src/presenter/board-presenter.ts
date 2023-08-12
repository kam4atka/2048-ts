import CellModel from '../model/cell-model';
import ControllService from '../service/control-service';
import GameService from '../service/game-service';
import Board from '../components/board';
import Cell from '../components/cell';
import Tile from '../components/tile';
import Popup from '../components/popup';
import { getRandomValue } from '../utils/get-random-value';
import { render } from '../utils/render';
import { Keys, Message } from '../const';

export default class BoardPresenter {
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

    this.rootEl = rootEl;

    this.boardEl = new Board().getElement();

    this.bindLocalHandlers();

    // eslint-disable-next-line
    this.controllService.setAfterEach(this.checkPossibilityMove);
    this.controllService.setHandlers(this.createControllMap());
  }

  init() {
    this.renderPopup(Message.Start);
  }

  bindLocalHandlers() {
    this.checkPossibilityMove = this.checkPossibilityMove.bind(this);
  }

  renderBoard() {
    this.controllService.init();

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

  renderPopup(message: Message) {
    const popupComponent = new Popup(message);
    const popupEl = popupComponent.get();

    popupComponent.setButtonHandler(() => {
      this.cellModel.setCollection();
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

  checkPossibilityMove() {
    const canMoveUp = this.gameService.canMove(this.cellModel.groupCollectionByColumn());
    const canMoveDown = this.gameService.canMove(this.cellModel.groupCollectionByColumnReverse());
    const canMoveLeft = this.gameService.canMove(this.cellModel.groupCollectionByRow());
    const canMoveRight = this.gameService.canMove(this.cellModel.groupCollectionByRowReverse());

    if (!canMoveUp && !canMoveDown && !canMoveLeft && !canMoveRight) {
      this.controllService.clearHandlers();
      this.renderPopup(Message.Finish);
    }
  }

  createControllMap() {
    const moveUp = async () => {
      const groupedCells = this.cellModel.groupCollectionByColumn();

      if (this.gameService.canMove(groupedCells)) {
        await this.gameService.slideTiles(groupedCells);
        this.renderTile();
      }
    };

    const moveDown = async () => {
      const groupedCells = this.cellModel.groupCollectionByColumnReverse();

      if (this.gameService.canMove(groupedCells)) {
        await this.gameService.slideTiles(groupedCells);
        this.renderTile();
      }
    };

    const moveLeft = async () => {
      const groupedCells = this.cellModel.groupCollectionByRow();

      if (this.gameService.canMove(groupedCells)) {
        await this.gameService.slideTiles(groupedCells);
        this.renderTile();
      }
    };

    const moveRight = async () => {
      const groupedCells = this.cellModel.groupCollectionByRowReverse();

      if (this.gameService.canMove(groupedCells)) {
        await this.gameService.slideTiles(groupedCells);
        this.renderTile();
      }
    };

    return {
      [Keys.Up]: moveUp,
      [Keys.Down]: moveDown,
      [Keys.Left]: moveLeft,
      [Keys.Right]: moveRight
    };
  }
}
