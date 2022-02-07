export class Game {
  public "@id"?: string;

  constructor(
    _id?: string,
    public name?: string,
    public publisher?: string,
    public width?: number,
    public height?: number,
    public disclaimer?: string,
    public active?: boolean,
    public image?: string,
    public userId?: number,
    public lastModified?: Date,
    public desktop?: boolean,
    public mobile?: boolean,
    public gameTypeId?: number,
    public min?: number,
    public max?: number,
    public gamelimit?: number,
    public funSupported?: boolean,
    public iframe?: boolean,
    public provider?: string,
    public dateAdded?: Date,
    public rtp?: string,
    public jackpot?: boolean,
    public seoName?: string,
    public help?: string,
    public rowCustomImage?: boolean,
    public reels?: number,
    public rows?: number,
    public lines?: number,
    public volatility?: string,
    public isState?: boolean,
    public gameProvider?: string,
    public launchcode?: string,
    public details?: string
  ) {
    this["@id"] = _id;
  }
}
