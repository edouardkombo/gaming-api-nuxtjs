import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { GameInfo } from "../../types/GameInfo";

interface Props {
  game_infos: GameInfo[];
}

export const List: FunctionComponent<Props> = ({ game_infos }) => (
  <div>
    <h1>GameInfo List</h1>
    <Link href="/game_infos/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>brandid</th>
          <th>language</th>
          <th>description</th>
          <th>userId</th>
          <th>lastModified</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {game_infos &&
          game_infos.length !== 0 &&
          game_infos.map((gameinfo) => (
            <tr key={gameinfo["@id"]}>
              <th scope="row">
                <ReferenceLinks items={gameinfo["@id"]} type="gameinfo" />
              </th>
              <td>{gameinfo["brandid"]}</td>
              <td>{gameinfo["language"]}</td>
              <td>{gameinfo["description"]}</td>
              <td>{gameinfo["userId"]}</td>
              <td>{gameinfo["lastModified"]}</td>
              <td>
                <ReferenceLinks
                  items={gameinfo["@id"]}
                  type="gameinfo"
                  useIcon={true}
                />
              </td>
              <td>
                <Link href={`${gameinfo["@id"]}/edit`}>
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
