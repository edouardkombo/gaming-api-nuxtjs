import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/game/List";
import { PagedCollection } from "../../types/Collection";
import { Game } from "../../types/Game";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";

interface Props {
  collection: PagedCollection<Game>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <div>
    <div>
      <Head>
        <title>Game List</title>
      </Head>
    </div>
    <List games={collection["hydra:member"]} />
  </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/games");

  return { collection };
};

export default Page;
