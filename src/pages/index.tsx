import { trpc } from "@/utils/trpc";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Task Manager</title>
        <meta name="description" content="Created and developed by fcaramez" />
      </Head>
    </>
  );
};

export default Home;
