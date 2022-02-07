import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/gameinfo/Form";
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
          <title>{gameinfo && `Edit GameInfo ${gameinfo["@id"]}`}</title>
        </Head>
      </div>
      <Form gameinfo={gameinfo} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const gameinfo = await fetch(asPath.replace("/edit", ""));

  return { gameinfo };
};

export default Page;
