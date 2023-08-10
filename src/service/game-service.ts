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

  slideTiles(direction: Direction, cells: Cell[]) {
    let groupedCells: Cell[][];

    switch (direction) {
      case Direction.Up:
        groupedCells = this.groupCellsByColumn(cells);
        break;
      case Direction.Down:
        groupedCells = this.groupCellsByColumnReverse(cells);
        break;
    }

    groupedCells.forEach((groupCells) => this.slideTilesInGroup(groupCells));
  }

  slideTilesInGroup(cells: Cell[]) {
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

      if (targetCell.isEmpty()) {
        targetCell.linkTile(currentTile);
      } else {
        targetCell.linkTileForMerge(currentTile);
      }

      targetCell.mergeTiles();
      currentCell.unlinkTile();
    }
  }
}
