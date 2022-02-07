import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/gamecode/Form";
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
          <title>{gamecode && `Edit GameCode ${gamecode["@id"]}`}</title>
        </Head>
      </div>
      <Form gamecode={gamecode} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const gamecode = await fetch(asPath.replace("/edit", ""));

  return { gamecode };
};

export default Page;
