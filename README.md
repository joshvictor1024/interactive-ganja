# interactive-ganja

Minimal geometric algebra visualization playground powered by:
- GA: https://github.com/enkimute/ganja.js
- Code editor: https://codemirror.net/
- Bundler: https://rollupjs.org/

## Install

You need `npm >= 5.2.0` and `node >= 14.18.0`. After cloning this repo, run `npm i` to install dependencies.

## Development

The framework of this playground is made up of `./index.html`, `./src/index.js`, and `./src/util.js`. Edit these files to alter its functionalities.

Demos are given in `src/demo/`. One of them can be set to be displayed on page load, specified in `index.js`.

Since a bundler is used, every time changes are made, you need to run `npm run build`. This generates new files from the modified source files, and transfer them to the `build/` to be served.

## Serve

Run `npm run build` first if you haven't done that before.

To run the server locally, run `npm run serve`. This should serve `index.html` at `http://localhost:3000/`, which you can connect to with your browser.


## Using the integrated editor

This simple webpage has a CodeMirror code editor. Write `ganja.js` code in the code editor, then press "Run" to run code. Press "Clear" to clear the canvas.

If you are new with `ganja.js`, we recommend that you take a look on [The CoffeeShop](https://enkimute.github.io/ganja.js/examples/coffeeshop.html), the official site hosting code examples.

Unfortunately, if you paste code from The CoffeeShop directly into the editor, you may face several issues, though all of them are easy to solve. Read on for instructions on how to modify your code.

### Spawning the graphical element

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

### 3D examples

When viewing 3D examples, you can manipulate the camera with your mouse. However, you need to specify the width and height of the returned graphical element. For example, in the previous example:
```js
return this.graph([0x0000ff,torus,0xff0000,c3],{gl:true, width:'100%', height:'400px'})
```

If you don't specify `width` and `height`, the dimension of the graphical element may change unexpectedly when you attempt to interact with it.
