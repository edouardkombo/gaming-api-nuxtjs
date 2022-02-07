import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/gamebrandblock/List";
import { PagedCollection } from "../../types/Collection";
import { GameBrandBlock } from "../../types/GameBrandBlock";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";

interface Props {
  collection: PagedCollection<GameBrandBlock>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <div>
    <div>
      <Head>
        <title>GameBrandBlock List</title>
      </Head>
    </div>
    <List game_brand_blocks={collection["hydra:member"]} />
  </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/game_brand_blocks");

  return { collection };
};

export default Page;
