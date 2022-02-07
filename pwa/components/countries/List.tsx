import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { Countries } from "../../types/Countries";

interface Props {
  countries: Countries[];
}

export const List: FunctionComponent<Props> = ({ countries }) => (
  <div>
    <h1>Countries List</h1>
    <Link href="/countries/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>country</th>
          <th>code</th>
          <th>jurisdiction</th>
          <th>id</th>
          <th>blockedGames</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {countries &&
          countries.length !== 0 &&
          countries.map((countries) => (
            <tr key={countries["@id"]}>
              <th scope="row">
                <ReferenceLinks items={countries["@id"]} type="countries" />
              </th>
              <td>{countries["country"]}</td>
              <td>{countries["code"]}</td>
              <td>
                <ReferenceLinks
                  items={countries["jurisdiction"]}
                  type="Jurisdiction"
                />
              </td>
              <td>{countries["id"]}</td>
              <td>
                <ReferenceLinks
                  items={countries["blockedGames"]}
                  type="GameCountryBlock"
                />
              </td>
              <td>
                <ReferenceLinks
                  items={countries["@id"]}
                  type="countries"
                  useIcon={true}
                />
              </td>
              <td>
                <Link href={`${countries["@id"]}/edit`}>
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
