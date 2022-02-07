export class GameInfo {
  public "@id"?: string;

  constructor(
    _id?: string,
    public brandid?: number,
    public language?: string,
    public description?: string,
    public userId?: number,
    public lastModified?: Date
  ) {
    this["@id"] = _id;
  }
}
