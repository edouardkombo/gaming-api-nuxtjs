import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { Brands } from "../../types/Brands";

interface Props {
  brands: Brands[];
}

export const List: FunctionComponent<Props> = ({ brands }) => (
  <div>
    <h1>Brands List</h1>
    <Link href="/brands/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>brand</th>
          <th>stageUrl</th>
          <th>siteUrl</th>
          <th>path</th>
          <th>liveServer</th>
          <th>liveSshPort</th>
          <th>enabled</th>
          <th>groupName</th>
          <th>liveUpdateEnabled</th>
          <th>params</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {brands &&
          brands.length !== 0 &&
          brands.map((brands) => (
            <tr key={brands["@id"]}>
              <th scope="row">
                <ReferenceLinks items={brands["@id"]} type="brands" />
              </th>
              <td>{brands["brand"]}</td>
              <td>{brands["stageUrl"]}</td>
              <td>{brands["siteUrl"]}</td>
              <td>{brands["path"]}</td>
              <td>{brands["liveServer"]}</td>
              <td>{brands["liveSshPort"]}</td>
              <td>{brands["enabled"]}</td>
              <td>{brands["groupName"]}</td>
              <td>{brands["liveUpdateEnabled"]}</td>
              <td>{brands["params"]}</td>
              <td>
                <ReferenceLinks
                  items={brands["@id"]}
                  type="brands"
                  useIcon={true}
                />
              </td>
              <td>
                <Link href={`${brands["@id"]}/edit`}>
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
