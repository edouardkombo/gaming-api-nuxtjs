export class Licensees {
  public "@id"?: string;

  constructor(
    _id?: string,
    public name?: string,
    public title?: string,
    public groupId?: number
  ) {
    this["@id"] = _id;
  }
}
