import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/brandrelations/Show";
import { BrandRelations } from "../../../types/BrandRelations";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  brandrelations: BrandRelations;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  brandrelations,
}) => {
  return (
    <div>
      <div>
        <Head>
          <title>{`Show BrandRelations ${brandrelations["@id"]}`}</title>
        </Head>
      </div>
      <Show brandrelations={brandrelations} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const brandrelations = await fetch(asPath);

  return { brandrelations };
};

export default Page;
