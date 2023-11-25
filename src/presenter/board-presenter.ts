import CoordModel from '../model/coord-model';
import ControllService from '../service/control-service';
import GameService from '../service/game-service';
import CellPresenter from './cell-presenter';
import Board from '../components/board';
import Tile from '../components/tile';
import Popup from '../components/popup';
import { getRandomValue } from '../utils/get-random-value';
import { render } from '../utils/render';
import { Keys, Message } from '../const';
import { Coords } from '../types/coord';

export default class BoardPresenter {
  private rootEl!: HTMLElement;
  private boardEl!: HTMLElement;

  private cellPresenters: Map<string, CellPresenter> = new Map();

  constructor(
    private controllService: ControllService,
    private gameService: GameService,
    private coordModel: CoordModel,
    rootEl: HTMLElement | null
  ) {
    if (!rootEl) {
      throw new Error('Failed to get root DOM element');
    }

    this.rootEl = rootEl;

    this.boardEl = new Board().getElement();

    this.controllService.setAfterEach(this.checkPossibilityMove);
    this.controllService.setHandlers(this.createControllMap());
  }

  init() {
    this.coordModel.getCollection()
      .forEach(([x, y]) =>
        this.cellPresenters.set(`${x}${y}`, new CellPresenter(x, y))
      );

    this.renderPopup(Message.Start);
  }

  renderBoard() {
    this.controllService.init();

    render(this.boardEl, this.rootEl);

    this.cellPresenters.forEach((cellPresenter) => this.renderCell(cellPresenter));

    this.renderTile();
    this.renderTile();
  }

  clearBoard() {
    this.cellPresenters.forEach((cellPresenter) => {
      cellPresenter.getTile()?.remove();
      cellPresenter.unlinkTile();
      cellPresenter.unlinkTileForMerge();
    });
  }

  renderCell(cellPresenter: CellPresenter) {
    render(cellPresenter.get(), this.boardEl);
  }

  renderTile() {
    const emptyCellPresenter = this.getEmptyCell();
    const {x, y} = emptyCellPresenter.getCoords();

    const tileComponent = new Tile();
    tileComponent.setPosition(x, y);
    tileComponent.setColor();

    emptyCellPresenter.linkTile(tileComponent);

    const tileEl = tileComponent.get();
    render(tileEl, this.boardEl);
  }

  renderPopup(message: Message) {
    const popupComponent = new Popup(message);
    const popupEl = popupComponent.get();

    popupComponent.setButtonHandler(() => {
      this.clearBoard();
      this.renderBoard();
      popupComponent.remove();
    });

    render(popupEl, this.rootEl);
  }

  getCellsByCoord = (groupsCoords: Coords[][]) =>
    groupsCoords.map((groupCoords) =>
      groupCoords.map(([x, y]) => {
        const cellPresenter = this.cellPresenters.get(`${x}${y}`);

        if (!cellPresenter) {
          throw new Error('Cell presenter is undefined');
        }

        return cellPresenter;
      })
    );

  getEmptyCell() {
    const emptyCells = Array.from(this.cellPresenters.values())
      .filter((cellPresenter) => cellPresenter.isEmpty());

    return getRandomValue(emptyCells);
  }

  checkPossibilityMove = () => {
    if (
      !this.gameService.canMove(this.getCellsByCoord(this.coordModel.groupCollectionByColumn())) &&
      !this.gameService.canMove(this.getCellsByCoord(this.coordModel.groupCollectionByColumnReverse())) &&
      !this.gameService.canMove(this.getCellsByCoord(this.coordModel.groupCollectionByRow())) &&
      !this.gameService.canMove(this.getCellsByCoord(this.coordModel.groupCollectionByRowReverse()))
    ) {
      this.controllService.clearHandlers();
      this.renderPopup(Message.Finish);
    }
  };

  createControllMap() {
    const moveUp = async () => {
      const groupedCells = this.coordModel.groupCollectionByColumn();

      if (this.gameService.canMove(this.getCellsByCoord(groupedCells))) {
        await this.gameService.slideTiles(this.getCellsByCoord(groupedCells));
        this.renderTile();
      }
    };

    const moveDown = async () => {
      const groupedCells = this.coordModel.groupCollectionByColumnReverse();

      if (this.gameService.canMove(this.getCellsByCoord(groupedCells))) {
        await this.gameService.slideTiles(this.getCellsByCoord(groupedCells));
        this.renderTile();
      }
    };

    const moveLeft = async () => {
      const groupedCells = this.coordModel.groupCollectionByRow();

      if (this.gameService.canMove(this.getCellsByCoord(groupedCells))) {
        await this.gameService.slideTiles(this.getCellsByCoord(groupedCells));
        this.renderTile();
      }
    };

    const moveRight = async () => {
      const groupedCells = this.coordModel.groupCollectionByRowReverse();

      if (this.gameService.canMove(this.getCellsByCoord(groupedCells))) {
        await this.gameService.slideTiles(this.getCellsByCoord(groupedCells));
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
