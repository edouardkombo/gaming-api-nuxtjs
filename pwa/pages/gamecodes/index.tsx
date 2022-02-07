import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/gamecode/List";
import { PagedCollection } from "../../types/Collection";
import { GameCode } from "../../types/GameCode";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";

interface Props {
  collection: PagedCollection<GameCode>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <div>
    <div>
      <Head>
        <title>GameCode List</title>
      </Head>
    </div>
    <List game_codes={collection["hydra:member"]} />
  </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/game_codes");

  return { collection };
};

export default Page;
