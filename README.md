# interactive-ganja

Minimal geometric algebra visualization playground powered by:
- GA: https://github.com/enkimute/ganja.js
- Code editor: https://codemirror.net/
- Bundler: https://rollupjs.org/

## Usage

When cloning this repo for the first time, run `npm i`.

To run the server locally, run `npm run-script serve`. This should serve `index.html` at `http://localhost:3000/`, which you can connect to in your browser.

In the code editor, a `replaceCanvas()` function is exposed for your use.

After you input your code, press "Run" to run code and "Clear" to clear the canvas.

### Example

Paste the following into the code editor and press "Run".

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
