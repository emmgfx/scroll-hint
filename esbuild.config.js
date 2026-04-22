import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    minify: false,
    sourcemap: true,
    outdir: "dist",
    format: "esm",
    target: ["esnext"],
    external: ["react", "react-dom", "react/jsx-runtime"],
    jsx: "automatic",
    tsconfig: "tsconfig.json",
    banner: {
      js: '"use client";',
    },
  })
  .catch(() => process.exit(1));
