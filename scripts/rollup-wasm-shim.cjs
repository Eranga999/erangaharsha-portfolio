const Module = require("node:module");
const wasmRollup = require("@rollup/wasm-node/dist/native.js");
const load = Module._load;

Module._load = function loadRollupWasm(request, parent, isMain) {
  if (
    request === "rollup/dist/native.js" ||
    request.endsWith("/rollup/dist/native.js") ||
    (request.endsWith("native.js") && parent?.filename?.includes("rollup")) ||
    (request.endsWith(".node") && request.includes("rollup"))
  ) {
    return wasmRollup;
  }
  return load.call(this, request, parent, isMain);
};
