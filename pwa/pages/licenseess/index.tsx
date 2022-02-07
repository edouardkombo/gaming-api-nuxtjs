import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/licensees/List";
import { PagedCollection } from "../../types/Collection";
import { Licensees } from "../../types/Licensees";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";

interface Props {
  collection: PagedCollection<Licensees>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <div>
    <div>
      <Head>
        <title>Licensees List</title>
      </Head>
    </div>
    <List licensees={collection["hydra:member"]} />
  </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/licensees");

  return { collection };
};

export default Page;
