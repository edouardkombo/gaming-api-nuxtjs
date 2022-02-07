export class Brands {
  public "@id"?: string;

  constructor(
    _id?: string,
    public brand?: string,
    public stageUrl?: string,
    public siteUrl?: string,
    public path?: string,
    public liveServer?: string,
    public liveSshPort?: number,
    public enabled?: boolean,
    public groupName?: string,
    public liveUpdateEnabled?: boolean,
    public params?: string
  ) {
    this["@id"] = _id;
  }
}
