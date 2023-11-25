import Cell from '../components/cell';
import Tile from '../components/tile';

export default class CellPresenter {
  private cellEl!: Cell;

  private x = 0;
  private y = 0;

  private tile: Tile | null = null;
  private tileForMerge: Tile | null = null;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.cellEl = new Cell();
  }

  get() {
    return this.cellEl.get();
  }

  getCoords() {
    return {x: this.x, y: this.y};
  }

  getCoordsByString() {
    return `${this.x}${this.y}`;
  }

  getTile() {
    return this.tile;
  }

  mergeTiles() {
    if (!this.tile || !this.tileForMerge) {
      return;
    }

    const newValue = this.tile?.getValue() + this.tileForMerge.getValue();
    this.tile.setValue(newValue);
    this.tile.setColor();
    this.tileForMerge.remove();
    this.unlinkTileForMerge();
  }

  linkTile(tile: Tile) {
    tile.setPosition(this.x, this.y);
    this.tile = tile;
  }

  linkTileForMerge(tile: Tile) {
    tile.setPosition(this.x, this.y);
    this.tileForMerge = tile;
  }

  unlinkTile() {
    this.tile = null;
  }

  unlinkTileForMerge() {
    this.tileForMerge = null;
  }

  isEmpty() {
    return (!this.tile);
  }

  hasTileForMerge() {
    return !!this.tileForMerge;
  }

  canAccept(newTile: Tile) {
    return this.isEmpty() ||
      (!this.hasTileForMerge() && this.tile?.getValue() === newTile.getValue());
  }
}
