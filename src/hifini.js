import { fetchhtml, readFile, writeFile } from "./utils.js";

const searchList = async (keyword) => {
  // const url = `https://hifini.net/search.htm?keyword=${keyword}`;
  const url = `https://kuwo.cn/search/list?key=traveling`;

  console.log("url", url);
  const html = await fetchhtml(url);

  console.log("html", html);

  const musicArrMatch = html.match(/music\s*:\s*(\[[\s\S]*?\])\s*\}/);
  if (!musicArrMatch) return [];

  let musicArrStr = musicArrMatch[1];

  console.log("musicArrStr", musicArrStr);

  musicArrStr = eval(musicArrStr);

  try {
    return musicArrStr[0];
  } catch (e) {
    return musicArrStr;
  }
};

// const keyword = await readFile("../entry.txt");
// const list = await searchList(keyword);

// console.log("list", list);

// await writeFile("../result.txt", JSON.stringify(list));
