import { toMatchImageSnapshot } from "jest-image-snapshot";
import webpack from "webpack";

import compile from "./helpers/compile";
import convertToPng from "./helpers/convertToPng";
import getCompiler from "./helpers/getCompiler";
import readAsset from "./helpers/readAsset";

expect.extend({ toMatchImageSnapshot });

describe('"background" option', () => {
  test("should work with red", async () => {
    const compiler = getCompiler({
      width: 10,
      height: 10,
      fit: "contain",
      background: "red",
      fileLoaderOptions: {
        name: "image.jpg",
      },
    });
    const stats = await compile(compiler);

    expect(
      await convertToPng(
        readAsset("image.jpg", compiler, stats as webpack.Stats, true)
      )
    ).toMatchImageSnapshot({
      customDiffConfig: { threshold: 0 },
      customSnapshotIdentifier: "10w-10h-80q-contain-red",
    });
  });
});