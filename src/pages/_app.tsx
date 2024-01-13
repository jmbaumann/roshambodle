import { type AppType } from "next/dist/shared/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
};

export default MyApp;
