import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/gamedetails/List";
import { PagedCollection } from "../../types/Collection";
import { GameDetails } from "../../types/GameDetails";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";

interface Props {
  collection: PagedCollection<GameDetails>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <div>
    <div>
      <Head>
        <title>GameDetails List</title>
      </Head>
    </div>
    <List game_details={collection["hydra:member"]} />
  </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/game_details");

  return { collection };
};

export default Page;
