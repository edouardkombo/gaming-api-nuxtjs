import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/brands/Form";
import { Brands } from "../../../types/Brands";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  brands: Brands;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({ brands }) => {
  return (
    <div>
      <div>
        <Head>
          <title>{brands && `Edit Brands ${brands["@id"]}`}</title>
        </Head>
      </div>
      <Form brands={brands} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const brands = await fetch(asPath.replace("/edit", ""));

  return { brands };
};

export default Page;
