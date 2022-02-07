import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetch } from "../../utils/dataAccess";
import ReferenceLinks from "../common/ReferenceLinks";
import { BrandGames } from "../../types/BrandGames";

interface Props {
  brandgames: BrandGames;
}

export const Show: FunctionComponent<Props> = ({ brandgames }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(brandgames["@id"], { method: "DELETE" });
      router.push("/brand_games");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{`Show BrandGames ${brandgames["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">launchcode</th>
            <td>{brandgames["launchcode"]}</td>
          </tr>
          <tr>
            <th scope="row">category</th>
            <td>{brandgames["category"]}</td>
          </tr>
          <tr>
            <th scope="row">seq</th>
            <td>{brandgames["seq"]}</td>
          </tr>
          <tr>
            <th scope="row">hot</th>
            <td>{brandgames["hot"]}</td>
          </tr>
          <tr>
            <th scope="row">new</th>
            <td>{brandgames["new"]}</td>
          </tr>
          <tr>
            <th scope="row">subCategory</th>
            <td>{brandgames["subCategory"]}</td>
          </tr>
          <tr>
            <th scope="row">brandid</th>
            <td>
              <ReferenceLinks items={brandgames["brandid"]} type="Brands" />
            </td>
          </tr>
          <tr>
            <th scope="row">game_codes</th>
            <td>
              <ReferenceLinks
                items={brandgames["game_codes"]}
                type="GameCode"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">gameCodes</th>
            <td>{brandgames["gameCodes"]}</td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/brand_games">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={`${brandgames["@id"]}/edit`}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        <a>Delete</a>
      </button>
    </div>
  );
};
