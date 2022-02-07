import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetch } from "../../utils/dataAccess";
import ReferenceLinks from "../common/ReferenceLinks";
import { Countries } from "../../types/Countries";

interface Props {
  countries: Countries;
}

export const Show: FunctionComponent<Props> = ({ countries }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(countries["@id"], { method: "DELETE" });
      router.push("/countries");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{`Show Countries ${countries["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">country</th>
            <td>{countries["country"]}</td>
          </tr>
          <tr>
            <th scope="row">code</th>
            <td>{countries["code"]}</td>
          </tr>
          <tr>
            <th scope="row">jurisdiction</th>
            <td>
              <ReferenceLinks
                items={countries["jurisdiction"]}
                type="Jurisdiction"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">id</th>
            <td>{countries["id"]}</td>
          </tr>
          <tr>
            <th scope="row">blockedGames</th>
            <td>
              <ReferenceLinks
                items={countries["blockedGames"]}
                type="GameCountryBlock"
              />
            </td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/countries">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={`${countries["@id"]}/edit`}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        <a>Delete</a>
      </button>
    </div>
  );
};
