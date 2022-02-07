import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { Languages } from "../../types/Languages";

interface Props {
  languages: Languages[];
}

export const List: FunctionComponent<Props> = ({ languages }) => (
  <div>
    <h1>Languages List</h1>
    <Link href="/languages/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>countryLanguage</th>
          <th>description</th>
          <th>sort</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {languages &&
          languages.length !== 0 &&
          languages.map((languages) => (
            <tr key={languages["@id"]}>
              <th scope="row">
                <ReferenceLinks items={languages["@id"]} type="languages" />
              </th>
              <td>{languages["countryLanguage"]}</td>
              <td>{languages["description"]}</td>
              <td>{languages["sort"]}</td>
              <td>
                <ReferenceLinks
                  items={languages["@id"]}
                  type="languages"
                  useIcon={true}
                />
              </td>
              <td>
                <Link href={`${languages["@id"]}/edit`}>
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
