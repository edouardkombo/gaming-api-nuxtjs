import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { GameProviders } from "../../types/GameProviders";

interface Props {
  game_providers: GameProviders[];
}

export const List: FunctionComponent<Props> = ({ game_providers }) => (
  <div>
    <h1>GameProviders List</h1>
    <Link href="/game_providers/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>title</th>
          <th>distributor</th>
          <th>mgaLicensed</th>
          <th>games</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {game_providers &&
          game_providers.length !== 0 &&
          game_providers.map((gameproviders) => (
            <tr key={gameproviders["@id"]}>
              <th scope="row">
                <ReferenceLinks
                  items={gameproviders["@id"]}
                  type="gameproviders"
                />
              </th>
              <td>{gameproviders["name"]}</td>
              <td>{gameproviders["title"]}</td>
              <td>{gameproviders["distributor"]}</td>
              <td>{gameproviders["mgaLicensed"]}</td>
              <td>
                <ReferenceLinks items={gameproviders["games"]} type="Game" />
              </td>
              <td>
                <ReferenceLinks
                  items={gameproviders["@id"]}
                  type="gameproviders"
                  useIcon={true}
                />
              </td>
              <td>
                <Link href={`${gameproviders["@id"]}/edit`}>
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
