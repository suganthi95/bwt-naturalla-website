export const setMetaTags = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  document.title = title;
  const setTag = (
    attr: "name" | "property",
    key: string,
    value: string
  ) => {
    let tag = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute(attr, key);
      document.head.appendChild(tag);
    }
    tag.content = value;
  };

  setTag("name", "title", title);
  setTag("name", "description", description);
  setTag("property", "og:description", description);
  setTag("name", "twitter:description", description);
  setTag("property", "og:type", "website");
  setTag("property", "og:url", window.location.href);
};
