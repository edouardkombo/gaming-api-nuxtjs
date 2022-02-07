import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/countries/Form";
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
          <title>{countries && `Edit Countries ${countries["@id"]}`}</title>
        </Head>
      </div>
      <Form countries={countries} />
    </div>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const countries = await fetch(asPath.replace("/edit", ""));

  return { countries };
};

export default Page;
