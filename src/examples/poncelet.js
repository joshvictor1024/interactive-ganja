// Adapted from:
// https://enkimute.github.io/ganja.js/examples/coffeeshop.html#pga2d_poncelet

import Algebra from "ganja.js";
import { replaceCanvas } from "../util";

export function poncelet() {
  // Example by Yao Liu on ObservableHQ (https://beta.observablehq.com/@liuyao12/poncelets-porism)
  Algebra(2,0,1,()=>{
    // Using Geometric/Clifford algebra with signature (2,0,1), based on the work of Charles Gunn
    var pt    = (x,y)=>!(1e0 + x*1e1 + y*1e2),
        vec   = (x,y)=>!(x*1e1 + y*1e2),
        dist  = (P,Q)=>((P.Normalized)&(Q.Normalized)).Length,
        refl  = (l,m)=>(l.Normalized<<m.Normalized)*2*(m.Normalized)-l.Normalized
    
    var A=pt(-1,-0.3), B=pt(-0.6,1), C=pt(0,-0.8), D=pt(0.5,1), E=pt(1.2,-0.3)  // five points of the conic
    
    var O=pt(0.3,0), F=pt(0,-0.1), r=()=>dist(O,F)   // circle
    
    var locus=(theta)=>{   // find the sixth point by Pascal's theorem
      var l=()=>A&vec(Math.cos(theta), Math.sin(theta)), 
          pascal=()=>((A&D)^(B&C))&(l^(B&E))   // the so-called Pascal line
      return ()=>((pascal^(D&E))&C)^l
    }
    
    var curve=(pts)=>pts.map((pt,i,arr)=>[pt, pts[i+1%arr.length]])
    
    var N=100, Nc=30
    var conic_pts = [...Array(N)].map((x,i)=>()=>locus(i*Math.PI/N)),
        conic = curve(conic_pts),
        circle_pts = [...Array(Nc)].map((x,i)=>()=>O+vec(r*Math.cos(i*2*Math.PI/Nc), r*Math.sin(i*2*Math.PI/Nc))),
        circle = curve(circle_pts)
    
    var poncelet=(P,l)=>{   // Poncelet map
      var pascal=()=>((P&D)^(B&C))&(l^(B&E)),
          Q=()=>((pascal^(D&E))&C)^l;
      return [Q,refl(l,Q&O)]
    };

    replaceCanvas(this.graph(()=>{
    //document.body.appendChild(this.graph(()=>{
      var P = locus(performance.now()/4000), // starting point
          d=()=>dist(P,O), angle=()=>Math.asin(r/d),
          rotor=()=>Math.cos(angle/2)+Math.sin(angle/2)*(P.Normalized),
          l=()=>P&(rotor>>>O)  // tangent to the inner circle
      var Q=P, poncelet_pts=[P], poncelet_lines=[l]
      for (let i=0; i<5; i++){
        [Q,l]=poncelet(Q,l)
        poncelet_pts.push(Q)
        poncelet_lines.push(l)
      }
      let polygon=poncelet_pts.slice(1).map((pt,i)=>[poncelet_pts[i], pt])
      return [
        "Poncelet's porism", 
        0x00AA88, ...conic, ...circle,
        0x444444, A,'A', B,'B', C,'C', D,'D', E,'E', P,'P', O,'O', F,'F', ...polygon
      ]}, {animate:true, grid:true, lineWidth:4})
    );
  })
}
