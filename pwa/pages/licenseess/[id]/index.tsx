import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/licensees/Show";
import { Licensees } from "../../../types/Licensees";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  licensees: Licensees;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  licensees,
}) => {
  return (
    <div>
      <div>
        <Head>
          <title>{`Show Licensees ${licensees["@id"]}`}</title>
        </Head>
      </div>
      <Show licensees={licensees} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const licensees = await fetch(asPath);

  return { licensees };
};

export default Page;
