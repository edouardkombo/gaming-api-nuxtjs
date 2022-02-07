import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetch } from "../../utils/dataAccess";
import ReferenceLinks from "../common/ReferenceLinks";
import { Category } from "../../types/Category";

interface Props {
  category: Category;
}

export const Show: FunctionComponent<Props> = ({ category }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(category["@id"], { method: "DELETE" });
      router.push("/categories");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{`Show Category ${category["@id"]}`}</h1>
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
            <td>{category["name"]}</td>
          </tr>
          <tr>
            <th scope="row">category</th>
            <td>{category["category"]}</td>
          </tr>
          <tr>
            <th scope="row">image</th>
            <td>{category["image"]}</td>
          </tr>
          <tr>
            <th scope="row">description</th>
            <td>{category["description"]}</td>
          </tr>
          <tr>
            <th scope="row">userId</th>
            <td>{category["userId"]}</td>
          </tr>
          <tr>
            <th scope="row">lastModified</th>
            <td>{category["lastModified"]}</td>
          </tr>
          <tr>
            <th scope="row">active</th>
            <td>{category["active"]}</td>
          </tr>
          <tr>
            <th scope="row">seq</th>
            <td>{category["seq"]}</td>
          </tr>
          <tr>
            <th scope="row">brandid</th>
            <td>
              <ReferenceLinks items={category["brandid"]} type="Brands" />
            </td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/categories">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={`${category["@id"]}/edit`}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        <a>Delete</a>
      </button>
    </div>
  );
};
