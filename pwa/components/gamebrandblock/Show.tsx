import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetch } from "../../utils/dataAccess";
import ReferenceLinks from "../common/ReferenceLinks";
import { GameBrandBlock } from "../../types/GameBrandBlock";

interface Props {
  gamebrandblock: GameBrandBlock;
}

export const Show: FunctionComponent<Props> = ({ gamebrandblock }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(gamebrandblock["@id"], { method: "DELETE" });
      router.push("/game_brand_blocks");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{`Show GameBrandBlock ${gamebrandblock["@id"]}`}</h1>
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
            <td>{gamebrandblock["launchcode"]}</td>
          </tr>
          <tr>
            <th scope="row">blockedDate</th>
            <td>{gamebrandblock["blockedDate"]}</td>
          </tr>
          <tr>
            <th scope="row">brandid</th>
            <td>
              <ReferenceLinks items={gamebrandblock["brandid"]} type="Brands" />
            </td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/game_brand_blocks">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={`${gamebrandblock["@id"]}/edit`}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        <a>Delete</a>
      </button>
    </div>
  );
};
