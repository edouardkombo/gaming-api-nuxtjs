import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../components/brandrelations/Form";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create BrandRelations </title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
