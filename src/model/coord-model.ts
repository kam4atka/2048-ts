import { ModelInterface } from '../interface/model.interface';
import { Coords } from '../types/coord';
import { Coord } from '../const';
export default class CoordModel implements ModelInterface<Coords> {
  private count = 0;

  private coords: Coords[];

  constructor(count: number) {
    this.coords = [];
    this.count = count;

    this.setCollection();
  }

  setCollection() {
    for (let i = 0; i < this.count; i++) {
      for (let j = 0; j < this.count; j++) {
        this.coords.push([j, i]);
      }
    }
  }

  getCollection() {
    return [...this.coords];
  }

  groupCollectionByColumn() {
    return this.coords.reduce((groupedCoords: Coords[][], coords: Coords) => {
      const x = coords[Coord.X];

      groupedCoords[x] = groupedCoords[x] || [];
      groupedCoords[x].push(coords);

      return groupedCoords;
    }, []);
  }

  groupCollectionByColumnReverse() {
    return this.coords.reduce((groupedCoords: Coords[][], coords: Coords) => {
      const x = coords[Coord.X];

      groupedCoords[x] = groupedCoords[x] || [];
      groupedCoords[x].unshift(coords);

      return groupedCoords;
    }, []);
  }

  groupCollectionByRow() {
    return this.coords.reduce((groupedCoords: Coords[][], coords: Coords) => {
      const y = coords[Coord.Y];

      groupedCoords[y] = groupedCoords[y] || [];
      groupedCoords[y].push(coords);

      return groupedCoords;
    }, []);
  }

  groupCollectionByRowReverse() {
    return this.coords.reduce((groupedCoords: Coords[][], coords: Coords) => {
      const y = coords[Coord.Y];

      groupedCoords[y] = groupedCoords[y] || [];
      groupedCoords[y].unshift(coords);

      return groupedCoords;
    }, []);
  }
}
