import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { GameDetails } from "../../types/GameDetails";

interface Props {
  game_details: GameDetails[];
}

export const List: FunctionComponent<Props> = ({ game_details }) => (
  <div>
    <h1>GameDetails List</h1>
    <Link href="/game_details/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {game_details &&
          game_details.length !== 0 &&
          game_details.map((gamedetails) => (
            <tr key={gamedetails["@id"]}>
              <th scope="row">
                <ReferenceLinks items={gamedetails["@id"]} type="gamedetails" />
              </th>
              <td>
                <ReferenceLinks
                  items={gamedetails["@id"]}
                  type="gamedetails"
                  useIcon={true}
                />
              </td>
              <td>
                <Link href={`${gamedetails["@id"]}/edit`}>
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
