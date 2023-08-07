import BoardPresenter from '../presenter/board-presenter';
import CellModel from '../model/cell-model';
import { BOARD_SIZE } from '../const';

export default class Application {
  private rootEl!: HTMLElement | null;
  private cellModel!: CellModel;

  constructor() {
    this.rootEl = document.querySelector('#root');
    this.cellModel = new CellModel(BOARD_SIZE);
  }

  init() {
    const boardPresenter = new BoardPresenter(this.cellModel, this.rootEl);
    boardPresenter.init();
  }
}
