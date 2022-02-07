export class GameCountryBlock {
  public "@id"?: string;

  constructor(
    _id?: string,
    public brandid?: number,
    public launchcode?: string,
    public country?: string,
    public blockedDate?: Date,
    public loggedOut?: boolean,
    public unfunded?: boolean
  ) {
    this["@id"] = _id;
  }
}
