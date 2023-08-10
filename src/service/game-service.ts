import Cell from '../components/cell';

export default class GameService {
  groupCellsByColumn(cells: Cell[]) {
    return cells.reduce((groupedCells: Cell[][], cell: Cell) => {
      const {x, y} = cell.getCoords();

      groupedCells[x] = groupedCells[x] || [];
      groupedCells[x][y] = cell;

      return groupedCells;
    }, []);
  }

  slideTiles(cells: Cell[]) {
    const groupedCells = this.groupCellsByColumn(cells);

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
