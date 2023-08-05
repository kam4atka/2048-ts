import BoardPresenter from '../presenter/board-presenter';
import CellModel from '../model/cell-model';
import { BOARD_SIZE } from '../const';

export default class Application {
  private rootEl!: Element | null;
  private cellModel!: CellModel;

  constructor() {
    this.rootEl = document.querySelector('#root');
    this.cellModel = new CellModel();
  }

  init() {
    const boardPresenter = new BoardPresenter(
      {
        cols: BOARD_SIZE,
        rows: BOARD_SIZE
      },
      this.rootEl,
      this.cellModel
    );

    boardPresenter.init();
  }
}
