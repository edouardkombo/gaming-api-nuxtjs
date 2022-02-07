import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { Game } from "../../types/Game";

interface Props {
  games: Game[];
}

export const List: FunctionComponent<Props> = ({ games }) => (
  <div>
    <h1>Game List</h1>
    <Link href="/games/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>publisher</th>
          <th>width</th>
          <th>height</th>
          <th>disclaimer</th>
          <th>active</th>
          <th>image</th>
          <th>userId</th>
          <th>lastModified</th>
          <th>desktop</th>
          <th>mobile</th>
          <th>gameTypeId</th>
          <th>min</th>
          <th>max</th>
          <th>gamelimit</th>
          <th>funSupported</th>
          <th>iframe</th>
          <th>provider</th>
          <th>dateAdded</th>
          <th>rtp</th>
          <th>jackpot</th>
          <th>seoName</th>
          <th>help</th>
          <th>rowCustomImage</th>
          <th>reels</th>
          <th>rows</th>
          <th>lines</th>
          <th>volatility</th>
          <th>isState</th>
          <th>gameProvider</th>
          <th>launchcode</th>
          <th>details</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {games &&
          games.length !== 0 &&
          games.map((game) => (
            <tr key={game["@id"]}>
              <th scope="row">
                <ReferenceLinks items={game["@id"]} type="game" />
              </th>
              <td>{game["name"]}</td>
              <td>{game["publisher"]}</td>
              <td>{game["width"]}</td>
              <td>{game["height"]}</td>
              <td>{game["disclaimer"]}</td>
              <td>{game["active"]}</td>
              <td>{game["image"]}</td>
              <td>{game["userId"]}</td>
              <td>{game["lastModified"]}</td>
              <td>{game["desktop"]}</td>
              <td>{game["mobile"]}</td>
              <td>{game["gameTypeId"]}</td>
              <td>{game["min"]}</td>
              <td>{game["max"]}</td>
              <td>{game["gamelimit"]}</td>
              <td>{game["funSupported"]}</td>
              <td>{game["iframe"]}</td>
              <td>{game["provider"]}</td>
              <td>{game["dateAdded"]}</td>
              <td>{game["rtp"]}</td>
              <td>{game["jackpot"]}</td>
              <td>{game["seoName"]}</td>
              <td>{game["help"]}</td>
              <td>{game["rowCustomImage"]}</td>
              <td>{game["reels"]}</td>
              <td>{game["rows"]}</td>
              <td>{game["lines"]}</td>
              <td>{game["volatility"]}</td>
              <td>{game["isState"]}</td>
              <td>
                <ReferenceLinks
                  items={game["gameProvider"]}
                  type="GameProviders"
                />
              </td>
              <td>{game["launchcode"]}</td>
              <td>
                <ReferenceLinks items={game["details"]} type="GameDetails" />
              </td>
              <td>
                <ReferenceLinks
                  items={game["@id"]}
                  type="game"
                  useIcon={true}
                />
              </td>
              <td>
                <Link href={`${game["@id"]}/edit`}>
                  <a>
                    <i className="bi bi-pen" aria-hidden="true" />
                    <span className="sr-only">Edit</span>
                  </a>
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);
