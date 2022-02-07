export class BrandRelations {
  public "@id"?: string;

  constructor(
    _id?: string,
    public licensee?: string,
    public games?: string[],
    public categories?: string[],
    public blockedGames?: string[]
  ) {
    this["@id"] = _id;
  }
}
