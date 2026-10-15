import Script from "next/script";

export function AudienceAnalytics({ scriptUrl }: { scriptUrl: string | null }) {
  if (!scriptUrl) return null;
  return <>
    <Script id="mairie-audience-init" strategy="afterInteractive">{`
      window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)};
      window.plausible.init=window.plausible.init||function(options){window.plausible.o=options||{}};
      window.plausible.init({formSubmissions:false,outboundLinks:false,captureOnLocalhost:false});
    `}</Script>
    <Script src={scriptUrl} strategy="afterInteractive" />
  </>;
}
