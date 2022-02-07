import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/gameinfo/List";
import { PagedCollection } from "../../types/Collection";
import { GameInfo } from "../../types/GameInfo";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";

interface Props {
  collection: PagedCollection<GameInfo>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <div>
    <div>
      <Head>
        <title>GameInfo List</title>
      </Head>
    </div>
    <List game_infos={collection["hydra:member"]} />
  </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/game_infos");

  return { collection };
};

export default Page;
