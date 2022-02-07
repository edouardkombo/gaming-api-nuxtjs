import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/gamecountryblock/Form";
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
          <title>
            {gamecountryblock &&
              `Edit GameCountryBlock ${gamecountryblock["@id"]}`}
          </title>
        </Head>
      </div>
      <Form gamecountryblock={gamecountryblock} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const gamecountryblock = await fetch(asPath.replace("/edit", ""));

  return { gamecountryblock };
};

export default Page;
