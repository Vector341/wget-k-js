import { getSourcesOption, sourcesPlugin } from "html-resouce-replacer";

let baseUrl = "";

const aTagSource = {
  tag: "a",
  attribute: "href",
  type: "src",
};

const isSupportAbsoluteURL = true;
const isSupportDataURL = true;
const sources = getSourcesOption({
  sources: {
    list: ["...", aTagSource],
  },
});
const __dirname = import.meta.dirname;
const context = __dirname;

const resourcePath = __dirname;
const imports = [];
const errors = [];
const replacements = [];

const process = sourcesPlugin({
  isSupportAbsoluteURL,
  isSupportDataURL,
  sources,
  resourcePath,
  context,
  imports,
  errors,
  replacements,
});

function getImportedHtml(html, imports) {
  if (imports.length === 0) {
    return "";
  }

  for (const item of imports) {
    const { importName, request } = item;

    // console.log("request", request.toString(), "\tbaseUrl: ", baseUrl);
    const url = new URL(request, baseUrl);

    html = html.replace(new RegExp(importName, "g"), url);
  }

  return html;
}

function getHtmlRaw(html, replacements) {
  let code = html;

  let needHelperImport = false;

  for (const item of replacements) {
    const { importName, replacementName, isValueQuoted, hash } = item;

    if (!isValueQuoted && !needHelperImport) {
      needHelperImport = true;
    }

    // const name = !isValueQuoted
    //   ? `${GET_SOURCE_FROM_IMPORT_NAME}(${importName}${!isValueQuoted ? ", true" : ""})`
    //   : importName;

    const url = getImportedHtml(importName, imports);

    code = code.replace(
      new RegExp(replacementName, "g"),
      `${url}${typeof hash !== "undefined" ? `${hash}` : ""}`,
    );
  }

  // Replaces "<script>" or "</script>" to "<" + "script>" or "<" + "/script>".
  // code = code.replace(/<(\/?script)/g, (_, s) =>
  //   isTemplateLiteralSupported ? `\${"<" + "${s}"}` : `<" + "${s}`,
  // );

  return code;
}

export default function (content, url) {
  baseUrl = url;
  let html = process(content);

  let dest = getHtmlRaw(html, replacements, {
    isTemplateLiteralSupported: false,
  });

  return dest;
}
