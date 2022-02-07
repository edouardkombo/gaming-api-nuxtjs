import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/gamecountryblock/List";
import { PagedCollection } from "../../types/Collection";
import { GameCountryBlock } from "../../types/GameCountryBlock";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";

interface Props {
  collection: PagedCollection<GameCountryBlock>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <div>
    <div>
      <Head>
        <title>GameCountryBlock List</title>
      </Head>
    </div>
    <List game_country_blocks={collection["hydra:member"]} />
  </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/game_country_blocks");

  return { collection };
};

export default Page;
