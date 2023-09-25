import { EditorView, basicSetup } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"

import { replaceCanvas } from "./util";
// import { torus } from "./examples/torus";
import { poncelet } from "./examples/poncelet";

let div = document.getElementById("my-div");
let myCanvas = document.createElement("canvas");
div.appendChild(myCanvas);

window.replaceCanvas = replaceCanvas;

// torus();
poncelet();

let editor = new EditorView({
  extensions: [basicSetup, javascript()],
  parent: div
})

document.getElementById("run").addEventListener("click", () => {
  let t = editor.contentDOM.innerText;
  // Please do not attack yourself with this, thank you.
  eval(t);
})

document.getElementById("clear").addEventListener("click", () => {
  replaceCanvas(document.createElement("canvas"));
})
