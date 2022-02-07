import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/gamebrandblock/Show";
import { GameBrandBlock } from "../../../types/GameBrandBlock";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  gamebrandblock: GameBrandBlock;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  gamebrandblock,
}) => {
  return (
    <div>
      <div>
        <Head>
          <title>{`Show GameBrandBlock ${gamebrandblock["@id"]}`}</title>
        </Head>
      </div>
      <Show gamebrandblock={gamebrandblock} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const gamebrandblock = await fetch(asPath);

  return { gamebrandblock };
};

export default Page;
