import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/gamebrandblock/Form";
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
          <title>
            {gamebrandblock && `Edit GameBrandBlock ${gamebrandblock["@id"]}`}
          </title>
        </Head>
      </div>
      <Form gamebrandblock={gamebrandblock} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const gamebrandblock = await fetch(asPath.replace("/edit", ""));

  return { gamebrandblock };
};

export default Page;
