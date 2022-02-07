import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { GameBrandBlock } from "../../types/GameBrandBlock";

interface Props {
  game_brand_blocks: GameBrandBlock[];
}

export const List: FunctionComponent<Props> = ({ game_brand_blocks }) => (
  <div>
    <h1>GameBrandBlock List</h1>
    <Link href="/game_brand_blocks/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>launchcode</th>
          <th>blockedDate</th>
          <th>brandid</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {game_brand_blocks &&
          game_brand_blocks.length !== 0 &&
          game_brand_blocks.map((gamebrandblock) => (
            <tr key={gamebrandblock["@id"]}>
              <th scope="row">
                <ReferenceLinks
                  items={gamebrandblock["@id"]}
                  type="gamebrandblock"
                />
              </th>
              <td>{gamebrandblock["launchcode"]}</td>
              <td>{gamebrandblock["blockedDate"]}</td>
              <td>
                <ReferenceLinks
                  items={gamebrandblock["brandid"]}
                  type="Brands"
                />
              </td>
              <td>
                <ReferenceLinks
                  items={gamebrandblock["@id"]}
                  type="gamebrandblock"
                  useIcon={true}
                />
              </td>
              <td>
                <Link href={`${gamebrandblock["@id"]}/edit`}>
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
