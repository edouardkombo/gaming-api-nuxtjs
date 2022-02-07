import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { BrandGames } from "../../types/BrandGames";

interface Props {
  brand_games: BrandGames[];
}

export const List: FunctionComponent<Props> = ({ brand_games }) => (
  <div>
    <h1>BrandGames List</h1>
    <Link href="/brand_games/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>launchcode</th>
          <th>category</th>
          <th>seq</th>
          <th>hot</th>
          <th>new</th>
          <th>subCategory</th>
          <th>brandid</th>
          <th>game_codes</th>
          <th>gameCodes</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {brand_games &&
          brand_games.length !== 0 &&
          brand_games.map((brandgames) => (
            <tr key={brandgames["@id"]}>
              <th scope="row">
                <ReferenceLinks items={brandgames["@id"]} type="brandgames" />
              </th>
              <td>{brandgames["launchcode"]}</td>
              <td>{brandgames["category"]}</td>
              <td>{brandgames["seq"]}</td>
              <td>{brandgames["hot"]}</td>
              <td>{brandgames["new"]}</td>
              <td>{brandgames["subCategory"]}</td>
              <td>
                <ReferenceLinks items={brandgames["brandid"]} type="Brands" />
              </td>
              <td>
                <ReferenceLinks
                  items={brandgames["game_codes"]}
                  type="GameCode"
                />
              </td>
              <td>{brandgames["gameCodes"]}</td>
              <td>
                <ReferenceLinks
                  items={brandgames["@id"]}
                  type="brandgames"
                  useIcon={true}
                />
              </td>
              <td>
                <Link href={`${brandgames["@id"]}/edit`}>
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
