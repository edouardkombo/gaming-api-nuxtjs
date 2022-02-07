import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/jurisdiction/Show";
import { Jurisdiction } from "../../../types/Jurisdiction";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  jurisdiction: Jurisdiction;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  jurisdiction,
}) => {
  return (
    <div>
      <div>
        <Head>
          <title>{`Show Jurisdiction ${jurisdiction["@id"]}`}</title>
        </Head>
      </div>
      <Show jurisdiction={jurisdiction} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const jurisdiction = await fetch(asPath);

  return { jurisdiction };
};

export default Page;
