import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/gameinfo/Show";
import { GameInfo } from "../../../types/GameInfo";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  gameinfo: GameInfo;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  gameinfo,
}) => {
  return (
    <div>
      <div>
        <Head>
          <title>{`Show GameInfo ${gameinfo["@id"]}`}</title>
        </Head>
      </div>
      <Show gameinfo={gameinfo} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const gameinfo = await fetch(asPath);

  return { gameinfo };
};

export default Page;
