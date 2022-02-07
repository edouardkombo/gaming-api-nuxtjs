import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { Game } from "../../types/Game";
import Image from 'next/image';


interface Props {
  games: Game[];
}

const buildImageUrl = (name) => {
  return `${process.env.game_image_url}${name}.jpg`;
}

const handleClick = (e, launchcode) => {
   alert(`The game launchode is: ${launchcode}`);
};


export const HomeList: FunctionComponent<Props> = ({ games }) => (
  <div>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Image</th>
          <th>Rtp</th>
          <th>Seo Name</th>
        </tr>
      </thead>
      <tbody>
        {games &&
          games.length !== 0 &&
          games.map((game) => (
            <tr key={game["@id"]} onClick={(e) => handleClick(e, game["launchcode"])}>
              <td>{game["name"] || game['gameCodes']["name"]}</td>
              <td>
                  <Image
                      src={buildImageUrl(`${game["launchcode"]}`)}
                      alt={game["help"]}
                      width={200}
                      height={150}
                      layout="responsive"
                  />
              </td>
              <td>{game["rtp"] || game['gameCodes']["rtp"]}</td>
              <td>{game["seoName"] || game['gameCodes']["seoName"]}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);
