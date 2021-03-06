import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../components/countries/Form";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Countries </title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
