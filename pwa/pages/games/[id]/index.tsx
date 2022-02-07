import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/game/Show";
import { Game } from "../../../types/Game";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  game: Game;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({ game }) => {
  return (
    <div>
      <div>
        <Head>
          <title>{`Show Game ${game["@id"]}`}</title>
        </Head>
      </div>
      <Show game={game} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const game = await fetch(asPath);

  return { game };
};

export default Page;
