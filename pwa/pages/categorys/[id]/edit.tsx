import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/category/Form";
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
          <title>{category && `Edit Category ${category["@id"]}`}</title>
        </Head>
      </div>
      <Form category={category} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const category = await fetch(asPath.replace("/edit", ""));

  return { category };
};

export default Page;
