import { fetchhtml, readFile, writeFile } from "./utils.js";
import * as cheerio from "cheerio";

const searchList = async (keyword) => {
  // const url = `https://hifini.net/search.htm?keyword=${keyword}`;
  const url = `https://kuwo.cn/search/list?key=traveling`;

  console.log("url", url);
  const html = await fetchhtml(url, ".search_list");

  console.log("html", html);

  const $ = cheerio.load(html);
  let list = [];

  $(".search_list .song_item")
    .get()
    .forEach((el) => {
      const name = $(el).find(".song_name").text();
      const artist = $(el).find(".song_artist").text();
      const album = $(el).find(".song_album").text();
      const src = $(el).find(".song_name").find("a").href;

      list.push({
        detailsPage: src,
        name: name,
        artist: artist,
        album: album,
      });
    });
  return list;
};

const keyword = await readFile("../entry.txt");
const list = await searchList(keyword);

console.log("list", list);

await writeFile("../result.txt", JSON.stringify(list));
