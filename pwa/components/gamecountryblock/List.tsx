import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { GameCountryBlock } from "../../types/GameCountryBlock";

interface Props {
  game_country_blocks: GameCountryBlock[];
}

export const List: FunctionComponent<Props> = ({ game_country_blocks }) => (
  <div>
    <h1>GameCountryBlock List</h1>
    <Link href="/game_country_blocks/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>brandid</th>
          <th>launchcode</th>
          <th>country</th>
          <th>blockedDate</th>
          <th>loggedOut</th>
          <th>unfunded</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {game_country_blocks &&
          game_country_blocks.length !== 0 &&
          game_country_blocks.map((gamecountryblock) => (
            <tr key={gamecountryblock["@id"]}>
              <th scope="row">
                <ReferenceLinks
                  items={gamecountryblock["@id"]}
                  type="gamecountryblock"
                />
              </th>
              <td>{gamecountryblock["brandid"]}</td>
              <td>{gamecountryblock["launchcode"]}</td>
              <td>
                <ReferenceLinks
                  items={gamecountryblock["country"]}
                  type="Countries"
                />
              </td>
              <td>{gamecountryblock["blockedDate"]}</td>
              <td>{gamecountryblock["loggedOut"]}</td>
              <td>{gamecountryblock["unfunded"]}</td>
              <td>
                <ReferenceLinks
                  items={gamecountryblock["@id"]}
                  type="gamecountryblock"
                  useIcon={true}
                />
              </td>
              <td>
                <Link href={`${gamecountryblock["@id"]}/edit`}>
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
