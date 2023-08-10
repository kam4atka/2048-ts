import { ComponentInterface } from '../interface/component.interface';
import Tile from './tile';
import { createElement } from '../utils/create-element';

export default class Cell implements ComponentInterface {
  private componentElement!: HTMLElement;

  private x = 0;
  private y = 0;

  private tile: Tile | null = null;
  private tileForMerge: Tile | null = null;

  constructor(x: number, y: number) {
    this.componentElement = this.getElement();

    this.x = x;
    this.y = y;
  }

  get () {
    return this.componentElement;
  }

  getTemplate() {
    return '<div class="cell"></div>';
  }

  getElement() {
    return createElement(this.getTemplate());
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
