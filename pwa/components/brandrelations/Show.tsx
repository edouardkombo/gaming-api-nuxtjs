import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetch } from "../../utils/dataAccess";
import ReferenceLinks from "../common/ReferenceLinks";
import { BrandRelations } from "../../types/BrandRelations";

interface Props {
  brandrelations: BrandRelations;
}

export const Show: FunctionComponent<Props> = ({ brandrelations }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(brandrelations["@id"], { method: "DELETE" });
      router.push("/brand_relations");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{`Show BrandRelations ${brandrelations["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">licensee</th>
            <td>
              <ReferenceLinks
                items={brandrelations["licensee"]}
                type="Licensees"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">games</th>
            <td>
              <ReferenceLinks
                items={brandrelations["games"]}
                type="BrandGames"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">categories</th>
            <td>
              <ReferenceLinks
                items={brandrelations["categories"]}
                type="Category"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">blockedGames</th>
            <td>
              <ReferenceLinks
                items={brandrelations["blockedGames"]}
                type="GameBrandBlock"
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
      <Link href="/brand_relations">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={`${brandrelations["@id"]}/edit`}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        <a>Delete</a>
      </button>
    </div>
  );
};
