# ES Modules

[Resource](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)

In the old days, JS was well known of the feature called scope.

- Each declared function has its own scope, where you can define variables and they are not accessible from outside of that function, but what if we want to share the variable with other function to make computation with ?
- The global scope is the solution to this problem, where the variables need to be decalared in the common shared scope between functions.

As an example, in the old days when we were using JQuery, where it was a must to put JQuery at the top of the page to make its functions available for other modules to use. so the order of declaring modules matter a lot otherwise it is not possible to use its functionalities.

- This way has a lot of down sides:

  - maintaining the order of the modules, otherwise nothing would work.
  - exposing variables to the global scope is dangerous because even by accedent any other function may have the ability to modify that variable.

- ES Modules concept:

  - the ability to split your code into small chunks, where in you declare you variables and functions that make sense to go together, and then using these modules to build any kind of applications.

  - There are 2 module systems have been actively used:
    - CJS ( CommonJS module ) supported by node js.
    - ESM ( Ecmascript module ) supported by browsers.

## How ES Module works:

The dependency between modules will create a graph of connections, where each connection represent an import from a file to another.

To let the browser build this graph it needs an entry point (the starting file) usually it is index.js. Building the graph will help the browser which file depends on which file.

### Module Records:

The browser does not need file to work but it needs code, so the browser needs to parse all files to extract the code and build what is known as module record.

Module records contains all dependencies needed from the entry point, and further more it creates a data structure for the parsed code.

### Module instance:

Based on the module records, module instance need to be generated which is a representation of the code + state.

Code is set of instructions gotten from the module records.

State is the value of the variables at any point of time, so it can be manipulated with code.

Building module instance for all modules goes through 3 steps:

- find, download, and parse all the code. ( construction )
- look for available memore space to allocate for import/export variables without filling the value. (instanciation)
- run the code and filling the memory with the values. (evaluation)

All Steps to build the module instance:

### Construction:

The construction is decomposed into 3 other steps:

#### Find and download:

- The loader will take care of finding and downloading the file, by starting from an entry point.
- Parsing the entry point and finding all the imports inside will build the graph of all dependencies if the file.
  -each import has its own specifier, it represents the path where to find the file, but each platform has its own way how to find the file (browsers and node js).
- browsers only accept url as module specifiers.
- ES module system needs to parse the file before loading its dependencies, because you can not know which are its dependencies if you did not parse it. unlike CommonJS system that handle this case differently because loading files from file system is different from loading them from internet.
- As CommonJS system can load file much faster, it makes sense to start the instaciation and evaluation one after another, because it does not have to wait for much time to download files.

  - This is why using dynamic variable in CommonJS approach is possible bacause variables will have their own values after loading immediately. Whereas in ES module variables can not have values, because the evaluation will not happen till building the module record.
  - There is an alternative to dynamic variable by using dynamic import (import operator).
  - Working with the dynamic import will push to create a new separated graph considering ther specifier as the entry point to build it up. In case there is a module existing in multiple files, it will be shared using something called MODULE MAP, because at the end it will be one module instance.
  - Module Map will serve as a caches to these modules in the first place, whenever there is a request to download a file the module map store the url with status is_fetching. in can there is another module looking for the same module the module map goes through the all urls to check it out, if it was already there it passes to the next module.

  - Parsing:
    - After downloading the file, it needs to be parsed in order to get all its imports (dependencies).
    - Once the module has been parsed it will be placed inside the module map.
    - At the end, we end up having a bench of modules records from one entry point.

#### Instanciation:

- This phase is all about wiring up the variables to memory, but without assigning a value to them.
- In order to instanciate the module record, the JS engine needs to parse the graph in depth first post-traversal algorithm way, to reach the leaves of the tree, this is for starting the allocation for the module that depends on anything, and then go up the tree.
- the JS engine starts by allocating the exports first and then attach the import to the same address (LIVE BINDING), because in ES module system the import and export share the same memory address, while in CommonJS when the value is exported it will be copied into another address.
- Even though the import and export are sharing the same address but only the export file can change the value of that address.
- As the import and exported module share the same address, in case the export file has changed the value of the exported value, it will be reflected on the importing file.

#### Evaluation:

- Using the same algorithm, the JS engine will go through the tree and fill the memory with the appropriate values relying on the outer variables (located outside functions).
- As opposed to instanciation phase, running the evaluation multiple time can lead to different results, especially when having side effects like making call to server. that is one reason why the module map is important.
- Module map store the modules as canonical url this ensures every module to be executed once, and also it will help prevent infinit loop calling between modules.
