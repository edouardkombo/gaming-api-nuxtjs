import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/brands/List";
import { PagedCollection } from "../../types/Collection";
import { Brands } from "../../types/Brands";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";

interface Props {
  collection: PagedCollection<Brands>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <div>
    <div>
      <Head>
        <title>Brands List</title>
      </Head>
    </div>
    <List brands={collection["hydra:member"]} />
  </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/brands");

  return { collection };
};

export default Page;
