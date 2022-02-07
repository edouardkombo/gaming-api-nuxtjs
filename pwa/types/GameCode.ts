export class GameCode {
  public "@id"?: string;

  constructor(
    _id?: string,
    public name?: string,
    public image?: string,
    public rtp?: string,
    public seoName?: string
  ) {
    this["@id"] = _id;
  }
}
