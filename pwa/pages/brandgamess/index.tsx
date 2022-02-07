import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/brandgames/List";
import { PagedCollection } from "../../types/Collection";
import { BrandGames } from "../../types/BrandGames";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";

interface Props {
  collection: PagedCollection<BrandGames>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <div>
    <div>
      <Head>
        <title>BrandGames List</title>
      </Head>
    </div>
    <List brand_games={collection["hydra:member"]} />
  </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/brand_games");

  return { collection };
};

export default Page;
