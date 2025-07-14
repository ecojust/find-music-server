import { fetchhtml, readFile, writeFile } from "./utils.js";

const searchList = async (keyword) => {
  const url = `https://hifini.net/search.htm?keyword=${keyword}`;
  console.log(url);
  const html = await fetchhtml(url);

  const musicArrMatch = html.match(/music\s*:\s*(\[[\s\S]*?\])\s*\}/);
  if (!musicArrMatch) return [];

  let musicArrStr = musicArrMatch[1];
  musicArrStr = eval(musicArrStr);

  try {
    return musicArrStr[0];
  } catch (e) {
    return musicArrStr;
  }
};

const keyword = await readFile("../entry.txt");
const list = await searchList(keyword);

await writeFile("../result.txt", JSON.stringify(list));
