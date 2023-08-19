import { Keys } from '../const';

export default class ControllService {
  private afterEach: (() => void) | null = null;

  private handlers: {[key: string]: () => Promise<unknown>} = {};

  init() {
    this.setupKeydownOnce();
  }

  setupKeydownOnce() {
    document.addEventListener('keydown', this.keyDownHandler, {once: true});
  }

  setAfterEach(cb: () => void) {
    this.afterEach = cb;
  }

  setHandlers(controllMap: {[key: string] : () => Promise<unknown>}) {
    Object.entries(controllMap)
      .forEach((controll) => {
        const [key, cb] = controll;

        this.handlers = {
          ...this.handlers,
          [key]: cb
        };
      });
  }

  clearHandlers() {
    document.removeEventListener('keydown', this.keyDownHandler);
  }

  keyDownHandler = async (event: KeyboardEvent) => {
    switch (event.key) {
      case Keys.Up:
        await this.handlers[Keys.Up]();
        this.setupKeydownOnce();
        break;
      case Keys.Down:
        await this.handlers[Keys.Down]();
        this.setupKeydownOnce();
        break;
      case Keys.Left:
        await this.handlers[Keys.Left]();
        this.setupKeydownOnce();
        break;
      case Keys.Right:
        await this.handlers[Keys.Right]();
        this.setupKeydownOnce();
        break;
      default:
        this.setupKeydownOnce();
        break;
    }

    if (this.afterEach) {
      this.afterEach();
    }
  };
}
