import {
  shareImage,
  shareUrl,
  title,
  metaDescription,
} from "../utils/constants";

const aTitle = title;

export function getMetadata(
  title: string = aTitle,
  description: string = metaDescription,
  url: string = shareUrl,
  image: string = shareImage
) {
  return {
    title,
    htmlAttrs: {
      lang: "de",
    },
    meta: [
      {
        hid: "og:title",
        name: "og:title",
        content: title,
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: title,
      },
      {
        hid: "description",
        name: "description",
        content: description,
      },
      {
        hid: "og:description",
        name: "og:description",
        content: description,
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: description,
      },
      {
        hid: "og:image",
        name: "og:image",
        content: image,
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: image,
      },
      {
        hid: "og:url",
        property: "og:url",
        content: url,
      },
      {
        hid: "twitter:url",
        name: "twitter:url",
        content: url,
      },
      {
        hid: "twitter:card",
        property: "twitter:card",
        content: "summary_large_image",
      },
      {
        hid: "twitter:site",
        property: "twitter:site",
        content: "@danielvonmirbach",
      },
      {
        hid: "twitter:creator",
        property: "twitter:creator",
        content: "@danielvonmirbach",
      },
    ] as { hid: string; name: string; content: string }[],
  };
}
