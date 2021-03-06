import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../components/jurisdiction/Form";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Jurisdiction </title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
