import Cell from '../components/cell';

export default class GameService {
  async slideTiles(groupedCells: Cell[][]) {
    const promises: Promise<unknown>[] = [];

    groupedCells.forEach((groupCells) => this.slideTilesInGroup(groupCells, promises));

    await Promise.all(promises);

    groupedCells
      .flat()
      .forEach((cell) => cell.hasTileForMerge() && cell.mergeTiles());
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

  canMove(groupedCells: Cell[][]) {
    return groupedCells.some((group) => this.canMoveInGroup(group));
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
