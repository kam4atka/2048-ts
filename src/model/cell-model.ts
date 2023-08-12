import { ModelInterface } from '../interface/model.interface';
import Cell from '../components/cell';

export default class CellModel implements ModelInterface<Cell> {
  private count = 0;

  private cells: Cell[];

  constructor(count: number) {
    this.cells = [];
    this.count = count;

    this.setCollection();
  }

  setCollection() {
    for (let i = 0; i < this.count; i++) {
      for (let j = 0; j < this.count; j++) {
        this.cells.push(new Cell(j, i));
      }
    }
  }

  getCollection() {
    return [...this.cells];
  }

  groupCollectionByColumn() {
    return this.cells.reduce((groupedCells: Cell[][], cell: Cell) => {
      const {x} = cell.getCoords();

      groupedCells[x] = groupedCells[x] || [];
      groupedCells[x].push(cell);

      return groupedCells;
    }, []);
  }

  groupCollectionByColumnReverse() {
    return this.cells.reduce((groupedCells: Cell[][], cell: Cell) => {
      const {x} = cell.getCoords();

      groupedCells[x] = groupedCells[x] || [];
      groupedCells[x].unshift(cell);

      return groupedCells;
    }, []);
  }

  groupCollectionByRow() {
    return this.cells.reduce((groupedCells: Cell[][], cell: Cell) => {
      const {y} = cell.getCoords();

      groupedCells[y] = groupedCells[y] || [];
      groupedCells[y].push(cell);

      return groupedCells;
    }, []);
  }

  groupCollectionByRowReverse() {
    return this.cells.reduce((groupedCells: Cell[][], cell: Cell) => {
      const {y} = cell.getCoords();

      groupedCells[y] = groupedCells[y] || [];
      groupedCells[y].unshift(cell);

      return groupedCells;
    }, []);
  }
}
