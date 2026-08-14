const fs = require("fs");
const sharp = require("sharp");
const toIco = require("to-ico");

const svg = fs.readFileSync("src/app/icon.svg", "utf8");
fs.writeFileSync("public/icon.svg", svg);

const b64 = Buffer.from(svg).toString("base64");

function writeIconTsx(file, size, name) {
  const content = `import { ImageResponse } from "next/og";

export const size = { width: ${size}, height: ${size} };
export const contentType = "image/png";

const ICON_B64 = "${b64}";

export default function ${name}() {
  const src = \`data:image/svg+xml;base64,\${ICON_B64}\`;
  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} width={${size}} height={${size}} alt="" />
    ),
    { ...size },
  );
}
`;
  fs.writeFileSync(file, content);
}

writeIconTsx("src/app/icon.tsx", 48, "Icon");
writeIconTsx("src/app/apple-icon.tsx", 180, "AppleIcon");

(async () => {
  const pngs = [];
  for (const s of [16, 32, 48]) {
    pngs.push(await sharp("src/app/icon.svg").resize(s, s).png().toBuffer());
  }
  const ico = await toIco(pngs);
  fs.writeFileSync("src/app/favicon.ico", ico);
  fs.writeFileSync("public/favicon.ico", ico);
  for (const s of [48, 96, 192]) {
    await sharp("src/app/icon.svg")
      .resize(s, s)
      .png()
      .toFile(`public/favicon-${s}x${s}.png`);
  }
  await sharp("src/app/icon.svg")
    .resize(256, 256)
    .png()
    .toFile("public/logo-options/side-plane-preview.png");
  console.log("ok", ico.length);
})();
