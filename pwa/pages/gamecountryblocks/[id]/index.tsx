import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/gamecountryblock/Show";
import { GameCountryBlock } from "../../../types/GameCountryBlock";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  gamecountryblock: GameCountryBlock;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  gamecountryblock,
}) => {
  return (
    <div>
      <div>
        <Head>
          <title>{`Show GameCountryBlock ${gamecountryblock["@id"]}`}</title>
        </Head>
      </div>
      <Show gamecountryblock={gamecountryblock} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const gamecountryblock = await fetch(asPath);

  return { gamecountryblock };
};

export default Page;
