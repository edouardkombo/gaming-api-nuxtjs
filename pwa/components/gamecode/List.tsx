import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { GameCode } from "../../types/GameCode";

interface Props {
  game_codes: GameCode[];
}

export const List: FunctionComponent<Props> = ({ game_codes }) => (
  <div>
    <h1>GameCode List</h1>
    <Link href="/game_codes/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>image</th>
          <th>rtp</th>
          <th>seoName</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {game_codes &&
          game_codes.length !== 0 &&
          game_codes.map((gamecode) => (
            <tr key={gamecode["@id"]}>
              <th scope="row">
                <ReferenceLinks items={gamecode["@id"]} type="gamecode" />
              </th>
              <td>{gamecode["name"]}</td>
              <td>{gamecode["image"]}</td>
              <td>{gamecode["rtp"]}</td>
              <td>{gamecode["seoName"]}</td>
              <td>
                <ReferenceLinks
                  items={gamecode["@id"]}
                  type="gamecode"
                  useIcon={true}
                />
              </td>
              <td>
                <Link href={`${gamecode["@id"]}/edit`}>
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
