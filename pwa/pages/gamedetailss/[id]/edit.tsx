import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/gamedetails/Form";
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
          <title>
            {gamedetails && `Edit GameDetails ${gamedetails["@id"]}`}
          </title>
        </Head>
      </div>
      <Form gamedetails={gamedetails} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const gamedetails = await fetch(asPath.replace("/edit", ""));

  return { gamedetails };
};

export default Page;
