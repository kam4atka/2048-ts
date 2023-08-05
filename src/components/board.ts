import { ComponentInterface } from '../interface/component.interface';
import { createElement } from '../utils/create-element';

export default class Board implements ComponentInterface {
  getTemplate() {
    return '<div class="board"></div>';
  }

  getElement() {
    return createElement(this.getTemplate());
  }
}
