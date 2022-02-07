import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/countries/List";
import { PagedCollection } from "../../types/Collection";
import { Countries } from "../../types/Countries";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";

interface Props {
  collection: PagedCollection<Countries>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <div>
    <div>
      <Head>
        <title>Countries List</title>
      </Head>
    </div>
    <List countries={collection["hydra:member"]} />
  </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/countries");

  return { collection };
};

export default Page;
