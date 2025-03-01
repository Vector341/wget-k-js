[![npm][npm]][npm-url]
[![node][node]][node-url]

# wget-k

Convert relative links in HTML to absolute URL. Like `wget --convert-links`

## Getting Started

```console
npm install wget-k
```

```js
import processHtml from "wget-k";

const dest = "https://example.com";
fetch(dest)
  .then((res) => res.text())
  .then((rawHtml) => processHtml(rawHtml, dest))
  .then(console.log);
```

[npm]: https://img.shields.io/npm/v/html-loader.svg
[npm-url]: https://npmjs.com/package/html-loader
[node]: https://img.shields.io/node/v/html-loader.svg
[node-url]: https://nodejs.org
