import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/category/List";
import { PagedCollection } from "../../types/Collection";
import { Category } from "../../types/Category";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";

interface Props {
  collection: PagedCollection<Category>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <div>
    <div>
      <Head>
        <title>Category List</title>
      </Head>
    </div>
    <List categories={collection["hydra:member"]} />
  </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/categories");

  return { collection };
};

export default Page;
