import processHtml from "./index.js";

const dest = "https://docs.deno.com/";
fetch(dest)
  .then((res) => res.text())
  .then((rawHtml) => processHtml(rawHtml, dest))
  .then(console.log);
