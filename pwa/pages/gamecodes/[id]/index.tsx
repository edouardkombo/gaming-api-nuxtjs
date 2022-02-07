import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/gamecode/Show";
import { GameCode } from "../../../types/GameCode";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  gamecode: GameCode;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  gamecode,
}) => {
  return (
    <div>
      <div>
        <Head>
          <title>{`Show GameCode ${gamecode["@id"]}`}</title>
        </Head>
      </div>
      <Show gamecode={gamecode} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const gamecode = await fetch(asPath);

  return { gamecode };
};

export default Page;
