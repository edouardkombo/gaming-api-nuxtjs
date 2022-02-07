import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetch } from "../../utils/dataAccess";
import ReferenceLinks from "../common/ReferenceLinks";
import { Game } from "../../types/Game";

interface Props {
  game: Game;
}

export const Show: FunctionComponent<Props> = ({ game }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(game["@id"], { method: "DELETE" });
      router.push("/games");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{`Show Game ${game["@id"]}`}</h1>
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
            <td>{game["name"]}</td>
          </tr>
          <tr>
            <th scope="row">publisher</th>
            <td>{game["publisher"]}</td>
          </tr>
          <tr>
            <th scope="row">width</th>
            <td>{game["width"]}</td>
          </tr>
          <tr>
            <th scope="row">height</th>
            <td>{game["height"]}</td>
          </tr>
          <tr>
            <th scope="row">disclaimer</th>
            <td>{game["disclaimer"]}</td>
          </tr>
          <tr>
            <th scope="row">active</th>
            <td>{game["active"]}</td>
          </tr>
          <tr>
            <th scope="row">image</th>
            <td>{game["image"]}</td>
          </tr>
          <tr>
            <th scope="row">userId</th>
            <td>{game["userId"]}</td>
          </tr>
          <tr>
            <th scope="row">lastModified</th>
            <td>{game["lastModified"]}</td>
          </tr>
          <tr>
            <th scope="row">desktop</th>
            <td>{game["desktop"]}</td>
          </tr>
          <tr>
            <th scope="row">mobile</th>
            <td>{game["mobile"]}</td>
          </tr>
          <tr>
            <th scope="row">gameTypeId</th>
            <td>{game["gameTypeId"]}</td>
          </tr>
          <tr>
            <th scope="row">min</th>
            <td>{game["min"]}</td>
          </tr>
          <tr>
            <th scope="row">max</th>
            <td>{game["max"]}</td>
          </tr>
          <tr>
            <th scope="row">gamelimit</th>
            <td>{game["gamelimit"]}</td>
          </tr>
          <tr>
            <th scope="row">funSupported</th>
            <td>{game["funSupported"]}</td>
          </tr>
          <tr>
            <th scope="row">iframe</th>
            <td>{game["iframe"]}</td>
          </tr>
          <tr>
            <th scope="row">provider</th>
            <td>{game["provider"]}</td>
          </tr>
          <tr>
            <th scope="row">dateAdded</th>
            <td>{game["dateAdded"]}</td>
          </tr>
          <tr>
            <th scope="row">rtp</th>
            <td>{game["rtp"]}</td>
          </tr>
          <tr>
            <th scope="row">jackpot</th>
            <td>{game["jackpot"]}</td>
          </tr>
          <tr>
            <th scope="row">seoName</th>
            <td>{game["seoName"]}</td>
          </tr>
          <tr>
            <th scope="row">help</th>
            <td>{game["help"]}</td>
          </tr>
          <tr>
            <th scope="row">rowCustomImage</th>
            <td>{game["rowCustomImage"]}</td>
          </tr>
          <tr>
            <th scope="row">reels</th>
            <td>{game["reels"]}</td>
          </tr>
          <tr>
            <th scope="row">rows</th>
            <td>{game["rows"]}</td>
          </tr>
          <tr>
            <th scope="row">lines</th>
            <td>{game["lines"]}</td>
          </tr>
          <tr>
            <th scope="row">volatility</th>
            <td>{game["volatility"]}</td>
          </tr>
          <tr>
            <th scope="row">isState</th>
            <td>{game["isState"]}</td>
          </tr>
          <tr>
            <th scope="row">gameProvider</th>
            <td>
              <ReferenceLinks
                items={game["gameProvider"]}
                type="GameProviders"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">launchcode</th>
            <td>{game["launchcode"]}</td>
          </tr>
          <tr>
            <th scope="row">details</th>
            <td>
              <ReferenceLinks items={game["details"]} type="GameDetails" />
            </td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/games">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={`${game["@id"]}/edit`}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        <a>Delete</a>
      </button>
    </div>
  );
};
