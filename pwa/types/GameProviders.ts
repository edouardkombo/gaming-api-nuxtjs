export class GameProviders {
  public "@id"?: string;

  constructor(
    _id?: string,
    public name?: string,
    public title?: string,
    public distributor?: string,
    public mgaLicensed?: boolean,
    public games?: string[]
  ) {
    this["@id"] = _id;
  }
}
