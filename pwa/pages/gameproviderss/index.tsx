import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/gameproviders/List";
import { PagedCollection } from "../../types/Collection";
import { GameProviders } from "../../types/GameProviders";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";

interface Props {
  collection: PagedCollection<GameProviders>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <div>
    <div>
      <Head>
        <title>GameProviders List</title>
      </Head>
    </div>
    <List game_providers={collection["hydra:member"]} />
  </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/game_providers");

  return { collection };
};

export default Page;
