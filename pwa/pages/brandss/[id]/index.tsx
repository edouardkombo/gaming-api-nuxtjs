import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/brands/Show";
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
          <title>{`Show Brands ${brands["@id"]}`}</title>
        </Head>
      </div>
      <Show brands={brands} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const brands = await fetch(asPath);

  return { brands };
};

export default Page;
