export class GameBrandBlock {
  public "@id"?: string;

  constructor(
    _id?: string,
    public launchcode?: string,
    public blockedDate?: Date,
    public brandid?: string
  ) {
    this["@id"] = _id;
  }
}
