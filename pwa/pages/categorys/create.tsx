import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../components/category/Form";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Category </title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
