import { create, createReportList } from "./modules/canvas.js";
import { draw, reportArea, reportPerimeter } from "./modules/square.js";
import randomSquare from "./modules/square.js";
// import css from "./exampleModules/index.css" with { type: "css" };
import styles from "gg/styles.css" with { type: "css" };

import var_1 from "gg/index1.js";
import var_2 from "mg/index2.js";

console.log('styles', styles);

console.log(var_1);
console.log(var_2);

document.adoptedStyleSheets = [styles];

let myCanvas = create("myCanvas", document.body, 480, 320);
let reportList = createReportList(myCanvas.id);

let square1 = draw(myCanvas.ctx, 50, 50, 100, "blue");
reportArea(square1.length, reportList);
reportPerimeter(square1.length, reportList);

// Use the default
let square2 = randomSquare(myCanvas.ctx);
