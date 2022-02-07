import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetch } from "../../utils/dataAccess";
import ReferenceLinks from "../common/ReferenceLinks";
import { GameCountryBlock } from "../../types/GameCountryBlock";

interface Props {
  gamecountryblock: GameCountryBlock;
}

export const Show: FunctionComponent<Props> = ({ gamecountryblock }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(gamecountryblock["@id"], { method: "DELETE" });
      router.push("/game_country_blocks");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{`Show GameCountryBlock ${gamecountryblock["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">brandid</th>
            <td>{gamecountryblock["brandid"]}</td>
          </tr>
          <tr>
            <th scope="row">launchcode</th>
            <td>{gamecountryblock["launchcode"]}</td>
          </tr>
          <tr>
            <th scope="row">country</th>
            <td>
              <ReferenceLinks
                items={gamecountryblock["country"]}
                type="Countries"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">blockedDate</th>
            <td>{gamecountryblock["blockedDate"]}</td>
          </tr>
          <tr>
            <th scope="row">loggedOut</th>
            <td>{gamecountryblock["loggedOut"]}</td>
          </tr>
          <tr>
            <th scope="row">unfunded</th>
            <td>{gamecountryblock["unfunded"]}</td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/game_country_blocks">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={`${gamecountryblock["@id"]}/edit`}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        <a>Delete</a>
      </button>
    </div>
  );
};
