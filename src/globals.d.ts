// Bundlers replace process.env.NODE_ENV with a literal, which is how the
// development-only checks drop out of production builds. Declared here instead
// of pulling @types/node into a browser library.
declare const process: { env: { NODE_ENV?: string } };
