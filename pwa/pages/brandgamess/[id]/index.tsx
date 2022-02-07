import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/brandgames/Show";
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
          <title>{`Show BrandGames ${brandgames["@id"]}`}</title>
        </Head>
      </div>
      <Show brandgames={brandgames} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const brandgames = await fetch(asPath);

  return { brandgames };
};

export default Page;
