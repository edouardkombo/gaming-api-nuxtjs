import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetch } from "../../utils/dataAccess";
import ReferenceLinks from "../common/ReferenceLinks";
import { GameProviders } from "../../types/GameProviders";

interface Props {
  gameproviders: GameProviders;
}

export const Show: FunctionComponent<Props> = ({ gameproviders }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(gameproviders["@id"], { method: "DELETE" });
      router.push("/game_providers");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{`Show GameProviders ${gameproviders["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">name</th>
            <td>{gameproviders["name"]}</td>
          </tr>
          <tr>
            <th scope="row">title</th>
            <td>{gameproviders["title"]}</td>
          </tr>
          <tr>
            <th scope="row">distributor</th>
            <td>{gameproviders["distributor"]}</td>
          </tr>
          <tr>
            <th scope="row">mgaLicensed</th>
            <td>{gameproviders["mgaLicensed"]}</td>
          </tr>
          <tr>
            <th scope="row">games</th>
            <td>
              <ReferenceLinks items={gameproviders["games"]} type="Game" />
            </td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/game_providers">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={`${gameproviders["@id"]}/edit`}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        <a>Delete</a>
      </button>
    </div>
  );
};
