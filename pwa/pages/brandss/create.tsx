import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../components/brands/Form";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Brands </title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
