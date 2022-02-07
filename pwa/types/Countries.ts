export class Countries {
  public "@id"?: string;

  constructor(
    _id?: string,
    public country?: string,
    public code?: string,
    public jurisdiction?: string,
    public id?: number,
    public blockedGames?: string[]
  ) {
    this["@id"] = _id;
  }
}
