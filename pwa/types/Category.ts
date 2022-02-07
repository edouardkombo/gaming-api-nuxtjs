export class Category {
  public "@id"?: string;

  constructor(
    _id?: string,
    public name?: string,
    public category?: string,
    public image?: string,
    public description?: string,
    public userId?: number,
    public lastModified?: Date,
    public active?: boolean,
    public seq?: number,
    public brandid?: string
  ) {
    this["@id"] = _id;
  }
}
