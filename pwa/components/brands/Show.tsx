import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetch } from "../../utils/dataAccess";
import ReferenceLinks from "../common/ReferenceLinks";
import { Brands } from "../../types/Brands";

interface Props {
  brands: Brands;
}

export const Show: FunctionComponent<Props> = ({ brands }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(brands["@id"], { method: "DELETE" });
      router.push("/brands");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{`Show Brands ${brands["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">brand</th>
            <td>{brands["brand"]}</td>
          </tr>
          <tr>
            <th scope="row">stageUrl</th>
            <td>{brands["stageUrl"]}</td>
          </tr>
          <tr>
            <th scope="row">siteUrl</th>
            <td>{brands["siteUrl"]}</td>
          </tr>
          <tr>
            <th scope="row">path</th>
            <td>{brands["path"]}</td>
          </tr>
          <tr>
            <th scope="row">liveServer</th>
            <td>{brands["liveServer"]}</td>
          </tr>
          <tr>
            <th scope="row">liveSshPort</th>
            <td>{brands["liveSshPort"]}</td>
          </tr>
          <tr>
            <th scope="row">enabled</th>
            <td>{brands["enabled"]}</td>
          </tr>
          <tr>
            <th scope="row">groupName</th>
            <td>{brands["groupName"]}</td>
          </tr>
          <tr>
            <th scope="row">liveUpdateEnabled</th>
            <td>{brands["liveUpdateEnabled"]}</td>
          </tr>
          <tr>
            <th scope="row">params</th>
            <td>{brands["params"]}</td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/brands">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={`${brands["@id"]}/edit`}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        <a>Delete</a>
      </button>
    </div>
  );
};
