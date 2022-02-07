import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { Category } from "../../types/Category";

interface Props {
  categories: Category[];
}

export const List: FunctionComponent<Props> = ({ categories }) => (
  <div>
    <h1>Category List</h1>
    <Link href="/categories/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>category</th>
          <th>image</th>
          <th>description</th>
          <th>userId</th>
          <th>lastModified</th>
          <th>active</th>
          <th>seq</th>
          <th>brandid</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {categories &&
          categories.length !== 0 &&
          categories.map((category) => (
            <tr key={category["@id"]}>
              <th scope="row">
                <ReferenceLinks items={category["@id"]} type="category" />
              </th>
              <td>{category["name"]}</td>
              <td>{category["category"]}</td>
              <td>{category["image"]}</td>
              <td>{category["description"]}</td>
              <td>{category["userId"]}</td>
              <td>{category["lastModified"]}</td>
              <td>{category["active"]}</td>
              <td>{category["seq"]}</td>
              <td>
                <ReferenceLinks items={category["brandid"]} type="Brands" />
              </td>
              <td>
                <ReferenceLinks
                  items={category["@id"]}
                  type="category"
                  useIcon={true}
                />
              </td>
              <td>
                <Link href={`${category["@id"]}/edit`}>
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
