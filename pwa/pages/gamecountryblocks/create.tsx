import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../components/gamecountryblock/Form";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create GameCountryBlock </title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
