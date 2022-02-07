import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/gameproviders/Show";
import { GameProviders } from "../../../types/GameProviders";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  gameproviders: GameProviders;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  gameproviders,
}) => {
  return (
    <div>
      <div>
        <Head>
          <title>{`Show GameProviders ${gameproviders["@id"]}`}</title>
        </Head>
      </div>
      <Show gameproviders={gameproviders} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const gameproviders = await fetch(asPath);

  return { gameproviders };
};

export default Page;
