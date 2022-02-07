import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../components/languages/Form";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Languages </title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
