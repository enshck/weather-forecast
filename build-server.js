import esbuild from "esbuild";
import fs from "fs";

esbuild
  .build({
    entryPoints: ["server/Code.ts"],
    bundle: true,
    outfile: "dist/server/code.js",
    platform: "neutral",
    format: "esm",
    sourcemap: false,
    target: ["es2019"],
    minify: false,
  })
  .then(() => {
    // Remove export statements for Google Apps Script
    const filePath = "dist/server/code.js";
    let content = fs.readFileSync(filePath, "utf8");
    // Remove export { ... } statements
    content = content.replace(/export\s*{[^}]*};?\s*$/m, "");
    fs.writeFileSync(filePath, content);
  })
  .catch(() => process.exit(1));
