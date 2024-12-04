function encodeUrl(url) {
  return url.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default async function sitemap() {
  return [
    { url: encodeUrl(`${process.env.PUBLIC_BASE_URL}/`) },
    { url: encodeUrl(`${process.env.PUBLIC_BASE_URL}/home`) },
    { url: encodeUrl(`${process.env.PUBLIC_BASE_URL}/modules`) },
    { url: encodeUrl(`${process.env.PUBLIC_BASE_URL}/about`) },
    { url: encodeUrl(`${process.env.PUBLIC_BASE_URL}/contact`) },
  ];
}
