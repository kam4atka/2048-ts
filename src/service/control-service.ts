import { Keys } from '../const';

export default class ControllService {
  private handlers: {[key: string]: () => void} = {};

  constructor() {
    this.bindHandlers();
    this.setupKeydownOnce();
  }

  bindHandlers() {
    this.keyDownHandler = this.keyDownHandler.bind(this);
  }

  setupKeydownOnce() {
    // eslint-disable-next-line
    document.addEventListener('keydown', this.keyDownHandler, {once: true});
  }

  setHandler(action: Keys, cb: () => void) {
    this.handlers = {
      ...this.handlers,
      [action]: cb
    };
  }

  keyDownHandler(event: KeyboardEvent) {
    switch (event.key) {
      case Keys.Up:
        this.handlers[Keys.Up]();
        this.setupKeydownOnce();
        break;
      case Keys.Down:
        // eslint-disable-next-line
        console.log(Keys.Down);
        this.setupKeydownOnce();
        break;
      case Keys.Left:
        // eslint-disable-next-line
        console.log(Keys.Left);
        this.setupKeydownOnce();
        break;
      case Keys.Right:
        // eslint-disable-next-line
        console.log(Keys.Right);
        this.setupKeydownOnce();
        break;
      default:
        this.setupKeydownOnce();
        break;
    }
  }
}
