import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/brandrelations/List";
import { PagedCollection } from "../../types/Collection";
import { BrandRelations } from "../../types/BrandRelations";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";

interface Props {
  collection: PagedCollection<BrandRelations>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <div>
    <div>
      <Head>
        <title>BrandRelations List</title>
      </Head>
    </div>
    <List brand_relations={collection["hydra:member"]} />
  </div>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/brand_relations");

  return { collection };
};

export default Page;
