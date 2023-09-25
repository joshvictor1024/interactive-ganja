export function replaceCanvas(canvas) {
  let myDiv = document.getElementById("my-div");
  let myCanvas =
    myDiv.getElementsByTagName("canvas")[0] ||
    myDiv.getElementsByTagName("svg")[0];
  myCanvas.replaceWith(canvas);
}
