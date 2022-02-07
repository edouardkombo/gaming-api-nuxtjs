import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { Licensees } from "../../types/Licensees";

interface Props {
  licensees: Licensees[];
}

export const List: FunctionComponent<Props> = ({ licensees }) => (
  <div>
    <h1>Licensees List</h1>
    <Link href="/licensees/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>title</th>
          <th>groupId</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {licensees &&
          licensees.length !== 0 &&
          licensees.map((licensees) => (
            <tr key={licensees["@id"]}>
              <th scope="row">
                <ReferenceLinks items={licensees["@id"]} type="licensees" />
              </th>
              <td>{licensees["name"]}</td>
              <td>{licensees["title"]}</td>
              <td>{licensees["groupId"]}</td>
              <td>
                <ReferenceLinks
                  items={licensees["@id"]}
                  type="licensees"
                  useIcon={true}
                />
              </td>
              <td>
                <Link href={`${licensees["@id"]}/edit`}>
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
