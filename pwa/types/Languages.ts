export class Languages {
  public "@id"?: string;

  constructor(
    _id?: string,
    public countryLanguage?: string,
    public description?: string,
    public sort?: boolean
  ) {
    this["@id"] = _id;
  }
}
