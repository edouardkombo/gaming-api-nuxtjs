import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetch } from "../../utils/dataAccess";
import ReferenceLinks from "../common/ReferenceLinks";
import { Licensees } from "../../types/Licensees";

interface Props {
  licensees: Licensees;
}

export const Show: FunctionComponent<Props> = ({ licensees }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(licensees["@id"], { method: "DELETE" });
      router.push("/licensees");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{`Show Licensees ${licensees["@id"]}`}</h1>
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
            <td>{licensees["name"]}</td>
          </tr>
          <tr>
            <th scope="row">title</th>
            <td>{licensees["title"]}</td>
          </tr>
          <tr>
            <th scope="row">groupId</th>
            <td>{licensees["groupId"]}</td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/licensees">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={`${licensees["@id"]}/edit`}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        <a>Delete</a>
      </button>
    </div>
  );
};
