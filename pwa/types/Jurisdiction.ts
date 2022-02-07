export class Jurisdiction {
  public "@id"?: string;

  constructor(_id?: string, public name?: string, public folder?: string) {
    this["@id"] = _id;
  }
}
