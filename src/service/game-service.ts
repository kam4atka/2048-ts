import CellPresenter from '../presenter/cell-presenter';

export default class GameService {
  async slideTiles(groupedCells: CellPresenter[][]) {
    const promises: Promise<unknown>[] = [];

    groupedCells.forEach((groupCells) => this.slideTilesInGroup(groupCells, promises));

    await Promise.all(promises);

    groupedCells
      .flat()
      .forEach((cell) => cell.hasTileForMerge() && cell.mergeTiles());
  }

  slideTilesInGroup(cells: CellPresenter[], promises: Promise<unknown>[]) {
    for (let i = 1; i < cells.length; i++) {
      if (cells[i].isEmpty()) {
        continue;
      }

      const currentCell = cells[i];
      const currentTile = currentCell.getTile();

      if (!currentTile) {
        continue;
      }

      let targetCell: CellPresenter | null = null;
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

  canMove(groupedCells: CellPresenter[][]) {
    return groupedCells.some((group) => this.canMoveInGroup(group));
  }

  canMoveInGroup(cells: (CellPresenter)[]) {
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
