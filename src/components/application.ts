import { BOARD_SIZE } from '../const';
import Board from './board';

export default class Application {
  private rootEl!: Element | null;

  constructor() {
    this.rootEl = document.querySelector('#root');
  }

  init() {
    const board = new Board({
      cols: BOARD_SIZE,
      rows: BOARD_SIZE,
      rootEl: this.rootEl
    });

    board.init();
  }
}
