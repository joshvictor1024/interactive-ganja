# interactive-ganja

Minimal geometric algebra visualization playground powered by:
- GA: https://github.com/enkimute/ganja.js
- Code editor: https://codemirror.net/
- Bundler: https://rollupjs.org/

## Install

You need `npm >= 5.2.0` and `node >= 14.18.0`. After cloning this repo, run `npm i` to install dependencies.

## Development

Edit `./index.html` and `./src/*`. Run `npm run build` to generate new files from the modified source files.

## Run

Run `npm run build` first if you haven't done that before.

To run the server locally, run `npm run serve`. This should serve `index.html` at `http://localhost:3000/`, which you can connect to with your browser.

The simple webpage has a CodeMirror code editor. Paste the ganja code you want to run into the code editor, then press "Run" to run code. Press "Clear" to clear the canvas.

You will notice that after clicking "Run", a new area is appended to the end of the webpage, which is not what we want. Continue reading for a recommended solution.

### Examples

Take this example from [The CoffeeShop](https://enkimute.github.io/ganja.js/examples/coffeeshop.html#pga3d_points_and_lines):

```js
Algebra(3,0,1,()=>{
  //...
  document.body.appendChild(this.graph(()=>{
    //...
  }));
})
```

The `this.graph()` function creates an `<svg>` or `<canvas>` element, which can be add to the DOM using `appendChild()`. In our code we have written a custom `replaceCanvas()` function (in `./src/util.js`) just for this purpose.

To run the above example in our webpage, modify the example code as:

```js
replaceCanvas(this.graph(()=>{
// document.body.appendChild(this.graph(()=>{
  //...
}));
```

Therefore, the full code looks like:

```js
Algebra(3,0,1,()=>{
  var plane = (a,b,c,d)=>a*1e1 + b*1e2 + c*1e3 + d*1e0;
  var line = (...plucker)=>plucker*[1e01,1e02,1e03,1e12,1e13,1e23];
  var point = (x,y,z)=>!(1e0 + x*1e1 + y*1e2 + z*1e3);
  var A=point(0,.8,0), B=point(.8,-1,-.8), C=point(-.8,-1,-.8), D=point(.8,-1,.8), E=point(-.8,-1,.8);
  // Edit here
  // document.body.appendChild(this.graph(()=>{
  replaceCanvas(this.graph(()=>{
    var ec = E & C,
        p  = A & B & C;
    var avg = A+B+E
        bc  = B+C;
    var l = avg & bc;
    var intersect = l ^ (A & E & D);
    var l2 = l.Normalized + ec.Normalized;
    return [
      "Drag A,B,C,D,E",                                            // title.
      0xD0FFE1, [A,B,D],                                           // polygons
      0x00AA88, [A,B],[A,C],[A,D],[A,E],[B,C],[C,E],[E,D],[D,B],   // edges
      0x224488, A,"A",B,"B",C,"C",D,"D",E,"E",                     // points
      0x884488, ec,"E&C", p*0.1,"A&B&C",                           // join of points
      0x884488, bc, "B+C", avg, "A+B+E", l,                        // sum of points
      0x00AA88, intersect, "line ^ plane",                         // meets
      0xFF8844, l2, "sum of lines",                                // sum of lines.
    ]
  },{
    grid        : true, // Display a grid
    labels      : true, // Label the grid
    h           : 0.6,  // Heading
    p           : -0.15,// Pitching
    lineWidth   : 3,    // Custom lineWidth (default=1)
    pointRadius : 1,    // Custon point radius (default=1)
    fontSize    : 1,    // Custom font size (default=1)
    scale       : 1,    // Custom scale (default=1), mousewheel.
  }));
});
```

Here is another example that you can paste in:

```js
let canvas = Algebra(3,0,1,()=>{
  var circle = (r,biv)=>(t)=>Math.E**(Math.PI*t*biv) * Math.E**(r*1e03);

  var c1 = circle(0.3, 1e23),
      c2 = circle(0.05,  1e13),
      c3 = circle(0.1, 1e23),         
      torus = (x,y)=>c1(x)*c2(y);
  return this.graph([0x0000ff,torus,0xff0000,c3],{gl:true, width:'100%', height:'400px'})
});

// Exposed function for your use.
replaceCanvas(canvas);
```
