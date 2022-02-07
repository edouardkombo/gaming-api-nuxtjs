import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/jurisdiction/List";
import { PagedCollection } from "../../types/Collection";
import { Jurisdiction } from "../../types/Jurisdiction";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";

interface Props {
  collection: PagedCollection<Jurisdiction>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <div>
    <div>
      <Head>
        <title>Jurisdiction List</title>
      </Head>
    </div>
    <List jurisdictions={collection["hydra:member"]} />
  </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/jurisdictions");

  return { collection };
};

export default Page;
