import Cell from '../components/cell';
import { Direction } from '../const';

export default class GameService {
  groupCellsByColumn(cells: Cell[]) {
    return cells.reduce((groupedCells: Cell[][], cell: Cell) => {
      const {x} = cell.getCoords();

      groupedCells[x] = groupedCells[x] || [];
      groupedCells[x].push(cell);

      return groupedCells;
    }, []);
  }

  groupCellsByColumnReverse(cells: Cell[]) {
    return cells.reduce((groupedCells: Cell[][], cell: Cell) => {
      const {x} = cell.getCoords();

      groupedCells[x] = groupedCells[x] || [];
      groupedCells[x].unshift(cell);

      return groupedCells;
    }, []);
  }

  groupCellsByRow(cells: Cell[]) {
    return cells.reduce((groupedCells: Cell[][], cell: Cell) => {
      const {y} = cell.getCoords();

      groupedCells[y] = groupedCells[y] || [];
      groupedCells[y].push(cell);

      return groupedCells;
    }, []);
  }

  groupCellsByRowReverse(cells: Cell[]) {
    return cells.reduce((groupedCells: Cell[][], cell: Cell) => {
      const {y} = cell.getCoords();

      groupedCells[y] = groupedCells[y] || [];
      groupedCells[y].unshift(cell);

      return groupedCells;
    }, []);
  }

  async slideTiles(direction: Direction, cells: Cell[]) {
    const promises: Promise<unknown>[] = [];

    let groupedCells: Cell[][] = [];

    switch (direction) {
      case Direction.Up:
        groupedCells = this.groupCellsByColumn(cells);
        break;
      case Direction.Down:
        groupedCells = this.groupCellsByColumnReverse(cells);
        break;
      case Direction.Left:
        groupedCells = this.groupCellsByRow(cells);
        break;
      case Direction.Right:
        groupedCells = this.groupCellsByRowReverse(cells);
        break;
    }

    groupedCells.forEach((groupCells) => this.slideTilesInGroup(groupCells, promises));

    await Promise.all(promises);

    cells.forEach((cell) => cell.hasTileForMerge() && cell.mergeTiles());
  }

  slideTilesInGroup(cells: Cell[], promises: Promise<unknown>[]) {
    for (let i = 1; i < cells.length; i++) {
      if (cells[i].isEmpty()) {
        continue;
      }

      const currentCell = cells[i];
      const currentTile = currentCell.getTile();

      if (!currentTile) {
        continue;
      }

      let targetCell: Cell | null = null;
      let j = i - 1;

      while(j >= 0 && cells[j].canAccept(currentTile)) {
        targetCell = cells[j];
        j--;
      }

      if (!targetCell) {
        continue;
      }

      promises.push(currentTile.waitForTransitionEnd());

      if (targetCell.isEmpty()) {
        targetCell.linkTile(currentTile);
      } else {
        targetCell.linkTileForMerge(currentTile);
      }

      currentCell.unlinkTile();
    }
  }

  canMove(direction: Direction, cells: Cell[]) {
    let groupedCells: Cell[][] = [];

    switch (direction) {
      case Direction.Up:
        groupedCells = this.groupCellsByColumn(cells);
        break;
      case Direction.Down:
        groupedCells = this.groupCellsByColumnReverse(cells);
        break;
      case Direction.Left:
        groupedCells = this.groupCellsByRow(cells);
        break;
      case Direction.Right:
        groupedCells = this.groupCellsByRowReverse(cells);
        break;
    }

    return groupedCells.some((groupCells) => this.canMoveInGroup(groupCells));
  }

  canMoveInGroup(cells: Cell[]) {
    return cells.some((cell, index) => {
      if (index === 0 || cell.isEmpty()) {
        return false;
      }

      const newTile = cell.getTile();

      if (!newTile) {
        return false;
      }

      const targetCell = cells[index - 1];
      return targetCell.canAccept(newTile);
    });
  }
}
