import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/languages/List";
import { PagedCollection } from "../../types/Collection";
import { Languages } from "../../types/Languages";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";

interface Props {
  collection: PagedCollection<Languages>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <div>
    <div>
      <Head>
        <title>Languages List</title>
      </Head>
    </div>
    <List languages={collection["hydra:member"]} />
  </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/languages");

  return { collection };
};

export default Page;
