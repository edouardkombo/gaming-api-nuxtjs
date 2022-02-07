import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { Jurisdiction } from "../../types/Jurisdiction";

interface Props {
  jurisdictions: Jurisdiction[];
}

export const List: FunctionComponent<Props> = ({ jurisdictions }) => (
  <div>
    <h1>Jurisdiction List</h1>
    <Link href="/jurisdictions/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>folder</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {jurisdictions &&
          jurisdictions.length !== 0 &&
          jurisdictions.map((jurisdiction) => (
            <tr key={jurisdiction["@id"]}>
              <th scope="row">
                <ReferenceLinks
                  items={jurisdiction["@id"]}
                  type="jurisdiction"
                />
              </th>
              <td>{jurisdiction["name"]}</td>
              <td>{jurisdiction["folder"]}</td>
              <td>
                <ReferenceLinks
                  items={jurisdiction["@id"]}
                  type="jurisdiction"
                  useIcon={true}
                />
              </td>
              <td>
                <Link href={`${jurisdiction["@id"]}/edit`}>
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
