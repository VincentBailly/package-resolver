# package-resolver

Resolve the location of a package installed on disk.

Why not use `require.resolve()`?

- package-resolver is more specialized than require.resolve and this allows for optimizations which lead to less file-system operations.
- using require.resolve() to find the location of a package is broken when this package uses the exports feature [More here](https://github.com/nodejs/node/issues/33460)

## Usage

```
const { resolvePackage } = require("package-resolver");

(async function() {
  try {
    const result = await resolvePackage("react", process.cwd());
    console.log("react is installed here:", result);
  } catch {
    console.log("Cannot resolve react");
  }
})()


```
