import { ModelInterface } from '../interface/model.interface';
import Cell from '../components/cell';

export default class CellModel implements ModelInterface<Cell> {
  private cells: Map<string, Cell>;

  constructor() {
    this.cells = new Map();
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
