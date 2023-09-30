import { ComponentInterface } from '../interface/component.interface';
import { createElement } from '../utils/create-element';
import { BOARD_SIZE } from '../const';

export default class Board implements ComponentInterface {
  getTemplate() {
    return '<div class="board"></div>';
  }

  getElement() {
    const element = createElement(this.getTemplate());
    element.style.setProperty('--repeat-count', `${BOARD_SIZE}`);

    return element;
  }
}
