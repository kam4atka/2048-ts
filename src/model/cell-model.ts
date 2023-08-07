import { ModelInterface } from '../interface/model.interface';
import Cell from '../components/cell';

export default class CellModel implements ModelInterface<Cell> {
  private count = 0;

  private cells: Map<string, Cell>;

  constructor(count: number) {
    this.cells = new Map();
    this.count = count;

    this.setCollection();
  }

  setCollection() {
    for (let i = 0; i < this.count; i++) {
      for (let j = 0; j < this.count; j++) {
        this.set(new Cell(j, i));
      }
    }
  }

  getCollection() {
    return Array.from(this.cells.values());
  }

  set(cell: Cell) {
    this.cells.set(`${cell.getCoordsByString()}`, cell);
  }

  get(x: number, y: number) {
    const cell = this.cells.get(`${x}${y}`);

    return (cell) ? cell : null;
  }
}
