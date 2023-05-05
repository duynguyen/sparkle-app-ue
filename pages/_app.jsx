import Head from "next/head";
import Script from 'next/script'
import "../styles/globals.scss";
import '../styles/adventures.scss';
import { TimelineAnimationWrapper } from "../components/TimelineWrapper";
import ResizeProvider from "../components/ResizeProvider";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Sparkle Demo</title>
        <meta name="urn:auecon:aemconnection" content={`aem:${process.env.NEXT_PUBLIC_AUTHOR_HOST}`}/>
        <script src="universal-editor-embedded.js" async></script>
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
