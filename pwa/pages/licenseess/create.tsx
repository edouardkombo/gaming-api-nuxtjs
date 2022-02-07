import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../components/licensees/Form";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Licensees </title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
