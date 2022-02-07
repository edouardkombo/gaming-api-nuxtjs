import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetch } from "../../utils/dataAccess";
import ReferenceLinks from "../common/ReferenceLinks";
import { Languages } from "../../types/Languages";

interface Props {
  languages: Languages;
}

export const Show: FunctionComponent<Props> = ({ languages }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(languages["@id"], { method: "DELETE" });
      router.push("/languages");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{`Show Languages ${languages["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">countryLanguage</th>
            <td>{languages["countryLanguage"]}</td>
          </tr>
          <tr>
            <th scope="row">description</th>
            <td>{languages["description"]}</td>
          </tr>
          <tr>
            <th scope="row">sort</th>
            <td>{languages["sort"]}</td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/languages">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={`${languages["@id"]}/edit`}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        <a>Delete</a>
      </button>
    </div>
  );
};
