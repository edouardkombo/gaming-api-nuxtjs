import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/category/Show";
import { Category } from "../../../types/Category";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  category: Category;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  category,
}) => {
  return (
    <div>
      <div>
        <Head>
          <title>{`Show Category ${category["@id"]}`}</title>
        </Head>
      </div>
      <Show category={category} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const category = await fetch(asPath);

  return { category };
};

export default Page;
