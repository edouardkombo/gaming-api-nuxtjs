import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/game/Form";
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
          <title>{game && `Edit Game ${game["@id"]}`}</title>
        </Head>
      </div>
      <Form game={game} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const game = await fetch(asPath.replace("/edit", ""));

  return { game };
};

export default Page;
