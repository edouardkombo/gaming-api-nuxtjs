import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetch } from "../../utils/dataAccess";
import ReferenceLinks from "../common/ReferenceLinks";
import { GameCode } from "../../types/GameCode";

interface Props {
  gamecode: GameCode;
}

export const Show: FunctionComponent<Props> = ({ gamecode }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(gamecode["@id"], { method: "DELETE" });
      router.push("/game_codes");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{`Show GameCode ${gamecode["@id"]}`}</h1>
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
            <td>{gamecode["name"]}</td>
          </tr>
          <tr>
            <th scope="row">image</th>
            <td>{gamecode["image"]}</td>
          </tr>
          <tr>
            <th scope="row">rtp</th>
            <td>{gamecode["rtp"]}</td>
          </tr>
          <tr>
            <th scope="row">seoName</th>
            <td>{gamecode["seoName"]}</td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/game_codes">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={`${gamecode["@id"]}/edit`}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        <a>Delete</a>
      </button>
    </div>
  );
};
