import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetch } from "../../utils/dataAccess";
import ReferenceLinks from "../common/ReferenceLinks";
import { GameInfo } from "../../types/GameInfo";

interface Props {
  gameinfo: GameInfo;
}

export const Show: FunctionComponent<Props> = ({ gameinfo }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(gameinfo["@id"], { method: "DELETE" });
      router.push("/game_infos");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{`Show GameInfo ${gameinfo["@id"]}`}</h1>
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
            <td>{gameinfo["brandid"]}</td>
          </tr>
          <tr>
            <th scope="row">language</th>
            <td>{gameinfo["language"]}</td>
          </tr>
          <tr>
            <th scope="row">description</th>
            <td>{gameinfo["description"]}</td>
          </tr>
          <tr>
            <th scope="row">userId</th>
            <td>{gameinfo["userId"]}</td>
          </tr>
          <tr>
            <th scope="row">lastModified</th>
            <td>{gameinfo["lastModified"]}</td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/game_infos">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={`${gameinfo["@id"]}/edit`}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        <a>Delete</a>
      </button>
    </div>
  );
};
