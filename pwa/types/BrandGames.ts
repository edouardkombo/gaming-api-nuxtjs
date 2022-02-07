import GameCode from "./GameCode";

export class BrandGames {
  public "@id"?: string;

  constructor(
    _id?: string,
    public launchcode?: string,
    public category?: string,
    public seq?: number,
    public hot?: boolean,
    public new?: boolean,
    public subCategory?: string,
    public brandid?: string,
    public game_codes?: string,
    public gameCodes?: <GameCode>
  ) {
    this["@id"] = _id;
  }
}
