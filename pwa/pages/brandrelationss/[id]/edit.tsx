import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/brandrelations/Form";
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
          <title>
            {brandrelations && `Edit BrandRelations ${brandrelations["@id"]}`}
          </title>
        </Head>
      </div>
      <Form brandrelations={brandrelations} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const brandrelations = await fetch(asPath.replace("/edit", ""));

  return { brandrelations };
};

export default Page;
