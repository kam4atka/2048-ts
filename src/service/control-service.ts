import { Keys } from '../const';

export default class ControllService {
  private beforeEach: (() => void) | null = null;

  private handlers: {[key: string]: () => Promise<unknown>} = {};

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

  setBeforeEach(cb: () => void) {
    this.beforeEach = cb;
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

  async keyDownHandler(event: KeyboardEvent) {
    if (this.beforeEach) {
      this.beforeEach();
    }

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
  }
}
