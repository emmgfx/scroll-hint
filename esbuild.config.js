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
    // Keep the expression instead of inlining the NODE_ENV of whoever builds
    // the package: the development-only checks are for the consumer's bundler
    // to resolve, and it is the one that knows the environment.
    define: { "process.env.NODE_ENV": "process.env.NODE_ENV" },
    banner: {
      js: '"use client";',
    },
  })
  .catch(() => process.exit(1));
