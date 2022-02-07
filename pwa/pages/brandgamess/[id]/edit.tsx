import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/brandgames/Form";
import { BrandGames } from "../../../types/BrandGames";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  brandgames: BrandGames;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  brandgames,
}) => {
  return (
    <div>
      <div>
        <Head>
          <title>{brandgames && `Edit BrandGames ${brandgames["@id"]}`}</title>
        </Head>
      </div>
      <Form brandgames={brandgames} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const brandgames = await fetch(asPath.replace("/edit", ""));

  return { brandgames };
};

export default Page;
