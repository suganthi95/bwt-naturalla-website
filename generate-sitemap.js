// import { SitemapStream, streamToPromise } from "sitemap";
// import fs from "fs";
// import fetch from "node-fetch";
// import { configDotenv } from "dotenv";
//  configDotenv()
// const baseUrl = process.env.SITE_URL
// const apiUrl = process.env.API_URL


// async function generateSitemap() {
//   const responce = await fetch(`${apiUrl}/product/filter/by-feature`);
//   const products = await responce.json();

//   const links = [
//     { url: "/", changefreq: "weekly", priority: 1.0 },
//     { url: "/about", changefreq: "monthly", priority: 0.8 },
//     { url: "/contact", changefreq: "monthly", priority: 0.8 },
//     ...products.data.map((p) => ({
//       url: `/product/${p.slug}`,
//       changefreq: "weekly",
//       priority: 0.7,
//     })),
//   ];

//   const stream = new SitemapStream({ hostname: baseUrl });
//   const xmlData = await streamToPromise(ReadableFromArray(links, stream));

//   fs.writeFileSync("./public/demo_sitemap.xml", xmlData.toString());
//   console.log(" sitemap.xml generated successfully!");
// }

// function ReadableFromArray(links, stream) {
//   for (const link of links) stream.write(link);
//   stream.end();
//   return stream;
// }

// generateSitemap().catch(console.error);
