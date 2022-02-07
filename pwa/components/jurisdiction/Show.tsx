import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetch } from "../../utils/dataAccess";
import ReferenceLinks from "../common/ReferenceLinks";
import { Jurisdiction } from "../../types/Jurisdiction";

interface Props {
  jurisdiction: Jurisdiction;
}

export const Show: FunctionComponent<Props> = ({ jurisdiction }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(jurisdiction["@id"], { method: "DELETE" });
      router.push("/jurisdictions");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{`Show Jurisdiction ${jurisdiction["@id"]}`}</h1>
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
            <td>{jurisdiction["name"]}</td>
          </tr>
          <tr>
            <th scope="row">folder</th>
            <td>{jurisdiction["folder"]}</td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/jurisdictions">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={`${jurisdiction["@id"]}/edit`}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        <a>Delete</a>
      </button>
    </div>
  );
};
