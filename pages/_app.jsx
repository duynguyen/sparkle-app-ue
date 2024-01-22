import Head from "next/head";
import Script from 'next/script'
import "../styles/globals.scss";
import '../styles/adventures.scss';
import '../styles/articles.scss';
import { TimelineAnimationWrapper } from "../components/TimelineWrapper";
import ResizeProvider from "../components/ResizeProvider";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Sparkle Demo</title>
        <meta name="urn:auecon:aem" content={`aem:${process.env.NEXT_PUBLIC_AEM_HOST}`}/>
      </Head>

      <ResizeProvider>
        <TimelineAnimationWrapper>
          <Component {...pageProps} />
        </TimelineAnimationWrapper>
      </ResizeProvider>
    </>
  );
}

export default MyApp;
