import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/gameproviders/Form";
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
          <title>
            {gameproviders && `Edit GameProviders ${gameproviders["@id"]}`}
          </title>
        </Head>
      </div>
      <Form gameproviders={gameproviders} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const gameproviders = await fetch(asPath.replace("/edit", ""));

  return { gameproviders };
};

export default Page;
