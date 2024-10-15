# JavaScript Module

[Resource](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#other_differences_between_modules_and_standard_scripts)

**Note:**

```
Bundler tools will override the import maps that you are going to define on html, so do not bother creating one while using REACT.
```

### Module Characteristics:

- Modules used strict mode automatically.
- Modules are defered automatically.

### Bare Module:

- It is when you use just the name of the module instead of its whole url.
- They are natively supported by node js, whereas for browsers, they need to be provided by import maps.

### Trailing Slash:

Represents the slash that appears at the end of a URL.

- when it is used with import maps as in this example:

```
"https://example.com/shapes/": "/shapes/square/"
```

the slash at the end means it is a directory not just a file.

- So you can import anything from any file from that directory.

## Version Management with Import maps:

- There is another key called scopes used for version managment of modules.
- If the project is big and has many modules installed, it may end up in a case where some modules depends on another module but in different versions, in this case it adds extra complixity how to manage the import maps.
- Each module version will have its own url in the scope map, and then when looking for a module, it starts by looking into the scope section first and then if there is no matching url it will fall back to the import maps.

## Aggregation Module:

When you assemble multiple module and then export them through the same file.

Let's take this as an example:

```
// a.js
export  const a = 1;

// b.js
export  const b = 2;


// c.js
export { default as a } from "./a.js"
export { default as b } from "./b.js"
```

## Object Module:

When you export every functionality from the module:

```
import * as Module from "path";
Module.functionName()
```

## Dynamic imports:

- Example:

  ```
  const colors = fetch("../data/colors.json").then((response) => response.json());

  export default await colors;`
  ```

In the example above, the last line include an await statment which means any module import this module needs to wait till the colors.json are available then it starts consuming it.

## Cyclic modules:

This is may happen when a module A import another module an vis-versa.
Cyclic modules are bad to load modules, they might be blocking sometimes.

There is some steps to avoid cyclic modules:

- Merge the two modules into one.
- Move the shared code into a third module.
- Move some code from one module to the other.

## Isomorphic modules (cross platform code):

When writing a library try to split the code into 2 parts:

- the core which needs to be isomorphic, it means that it can work on every platform (browser, node js). try to not inlcude any DOM, network, file system interaction and expose only utility functions.
- the core can work on every platform

- the binding, read and write to the global context, for example: the browser binding may read from an input while node binding may read from a file system.
- the binding is a platform specific.

- Detect whether a particular global exists before using it. For example, if you test that typeof window === "undefined", you know that you are probably in a Node.js environment, and should not read DOM.

- Detect whether a particular global exists before using it. For example, if you test that typeof window === "undefined", you know that you are probably in a Node.js environment, and should not read DOM.

- The globalThis variable is a global object that is available in every environment and is useful if you want to read or create global variables within modules.
