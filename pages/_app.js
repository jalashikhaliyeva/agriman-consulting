import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../locales/i18n";
import Spinner from "@/components/Spinner";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AOSInitializer from "@/shared/utils/AOSInitializer";
import React from "react";


export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      if (url !== router.asPath) {
        setLoading(true);
      }
    };

    const handleRouteChangeEnd = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeEnd);
    router.events.on("routeChangeError", handleRouteChangeEnd);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeEnd);
      router.events.off("routeChangeError", handleRouteChangeEnd);
    };
  }, [router]);

  return (
    <>
      {loading && <Spinner />}
      <I18nextProvider i18n={i18n}>
        <Component {...pageProps} />
        <AOSInitializer>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss={true}
            draggable={true}
            pauseOnHover={true}
            theme="light"
          />
        </AOSInitializer>
      </I18nextProvider>
    </>
  );
}
