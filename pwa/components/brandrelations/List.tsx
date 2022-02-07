import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { BrandRelations } from "../../types/BrandRelations";

interface Props {
  brand_relations: BrandRelations[];
}

export const List: FunctionComponent<Props> = ({ brand_relations }) => (
  <div>
    <h1>BrandRelations List</h1>
    <Link href="/brand_relations/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>licensee</th>
          <th>games</th>
          <th>categories</th>
          <th>blockedGames</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {brand_relations &&
          brand_relations.length !== 0 &&
          brand_relations.map((brandrelations) => (
            <tr key={brandrelations["@id"]}>
              <th scope="row">
                <ReferenceLinks
                  items={brandrelations["@id"]}
                  type="brandrelations"
                />
              </th>
              <td>
                <ReferenceLinks
                  items={brandrelations["licensee"]}
                  type="Licensees"
                />
              </td>
              <td>
                <ReferenceLinks
                  items={brandrelations["games"]}
                  type="BrandGames"
                />
              </td>
              <td>
                <ReferenceLinks
                  items={brandrelations["categories"]}
                  type="Category"
                />
              </td>
              <td>
                <ReferenceLinks
                  items={brandrelations["blockedGames"]}
                  type="GameBrandBlock"
                />
              </td>
              <td>
                <ReferenceLinks
                  items={brandrelations["@id"]}
                  type="brandrelations"
                  useIcon={true}
                />
              </td>
              <td>
                <Link href={`${brandrelations["@id"]}/edit`}>
                  <a>
                    <i className="bi bi-pen" aria-hidden="true" />
                    <span className="sr-only">Edit</span>
                  </a>
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);
