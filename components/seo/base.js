import Head from "next/head";

const BaseSEO = ({
  title,
  metaTitle,
  description,
  ogTitle,
  ogImage,
  ogDescription,
}) => {
  return (
    <Head>
      <title>{title || "Mono"}</title>
      <meta
        name="title"
        content={metaTitle || "Mono - Platform live stream music"}
      />
      <meta
        name="description"
        content={
          description || "Platform live stream audio, music, image, voice"
        }
      />
      <meta
        name="keywords"
        content="voice, voice streaming, audio chat, podcast, live, drop-in audio, social network"
      />
      <meta
        property="og:image"
        itemProp="thumbnaiUrl"
        content={ogImage || "/images/onmic_mini.png"}
      />
      <meta
        property="og:title"
        content={ogTitle || "Onmic - Connection made audible"}
      />
      <meta
        property="og:description"
        content={
          ogDescription ||
          "A voice-streaming platform towards barrier-free expression and authentic connection through voice"
        }
      />
    </Head>
  );
};

export default BaseSEO;
