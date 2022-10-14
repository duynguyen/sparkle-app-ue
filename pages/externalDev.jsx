import { useContext, useEffect, useState } from "react";
import Panel from "../components/Panel";
import MobileHeader from "../components/MobileHeader";
import { WindowSizeProvider } from "../components/ResizeProvider";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import desktopData from "../backup/desktop.json";
import mobileData from "../backup/mobile.json";
import Head from "next/head";

export default function Graphiql(props) {
  const [data, setData] = useState(null);
  const [type, setType] = useState("desktop");
  const [loadRest, setLoadRest] = useState(false);
  const [hash, setHash] = useState(null);
  const [ignoreHash, setIgnoreHash] = useState(false);
  const [customHost, setCustomHost] = useState('https://publish-p54352-e657273.adobeaemcloud.com')

  const windowSize = useContext(WindowSizeProvider);
  useEffect(() => {
    if (windowSize.width === null) {
      return;
    }
    setData(null);
  }, [windowSize.width]);

  useEffect(() => {
    if (windowSize.height === null) {
      return;
    }
    ScrollTrigger.refresh();
  }, [windowSize.height]);

  useEffect(() => {
    if (data !== null) {
      return;
    }
    if ((windowSize.width > 840 && windowSize.height > 400) || windowSize.width === null) {
      setData(desktopData);
      setType("desktop");
    } else {
      setData(mobileData);
      setType("mobile");
    }
    const hash = window.location.hash;
    if (hash) {
      setLoadRest(true);
      setHash(hash);
    }
    ScrollTrigger.refresh();
  }, [data, windowSize.width, windowSize.height]);

  const handleEndOfIntroAnimation = () => {
    setLoadRest(true);
  };

  return !data ? null : (
    <div className={"page"}>
      <Head>
        <title>{data?.title || "Sparkle Demo"}</title>
        <meta name="description" content={data?.description?.plaintext} />
      </Head>
      {type === "mobile" && <MobileHeader mobileNavObj={data?.mobileNavMenu} />}
      {data?.panels?.map &&
        data.panels.map((panel, index) => {
          if (type === "desktop" && index > 0 && !loadRest) {
            document.body.style.overflowY = "scroll";
            return null;
          }
          return (
            <Panel
              panel={panel}
              panelNr={index}
              settings={{ type }}
              key={index}
              runOnEnd={index === 0 ? handleEndOfIntroAnimation : null}
              host={customHost}
              hash={hash}
              ignoreHash={ignoreHash}
              setIgnoreHash={setIgnoreHash}
            />
          );
        })}
    </div>
  );
}