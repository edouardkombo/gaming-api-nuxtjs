import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/countries/Show";
import { Countries } from "../../../types/Countries";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
  countries: Countries;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  countries,
}) => {
  return (
    <div>
      <div>
        <Head>
          <title>{`Show Countries ${countries["@id"]}`}</title>
        </Head>
      </div>
      <Show countries={countries} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const countries = await fetch(asPath);

  return { countries };
};

export default Page;
