import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/gamedetails/Show";
import { GameDetails } from "../../../types/GameDetails";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  gamedetails: GameDetails;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  gamedetails,
}) => {
  return (
    <div>
      <div>
        <Head>
          <title>{`Show GameDetails ${gamedetails["@id"]}`}</title>
        </Head>
      </div>
      <Show gamedetails={gamedetails} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const gamedetails = await fetch(asPath);

  return { gamedetails };
};

export default Page;
