import BoardPresenter from '../presenter/board-presenter';
import CellModel from '../model/cell-model';
import { BOARD_SIZE } from '../const';
import ControllService from '../service/control-service';
import GameService from '../service/game-service';

export default class Application {
  private rootEl!: HTMLElement | null;

  private cellModel!: CellModel;

  private controllService!: ControllService;
  private gameService!: GameService;

  constructor() {
    this.rootEl = document.querySelector('#root');

    this.controllService = new ControllService();
    this.gameService = new GameService();

    this.cellModel = new CellModel(BOARD_SIZE);
  }

  init() {
    const boardPresenter = new BoardPresenter(
      this.controllService,
      this.gameService,
      this.cellModel,
      this.rootEl
    );
    boardPresenter.init();
  }
}
