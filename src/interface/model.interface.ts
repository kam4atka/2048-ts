export interface ModelInterface<Document> {
  getCollection(): Document[];
  set(document: Document): void;
  get(x: number, y: number): Document | null;
}
