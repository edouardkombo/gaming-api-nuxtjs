import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../components/gamedetails/Form";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create GameDetails </title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
