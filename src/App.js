/// <reference path="../TSDef/p5.d.ts" />
import './App.css';
import React from 'react'
import Sketch from 'react-p5';
import p5Types from "p5";




function App() {
  let x1 =100;
  let x2 =300;
  let a;
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    a = p5.createA("https://lukeknight.site","linkers");
    p5.frameRate(30);
  }
  
  const draw = p5 => {
    p5.background(255, 130, 20);
    p5.ellipse(x1, 100, 100);
    a.position(x1,100);
    p5.ellipse(x2, 100, 100);
    x1 +=p5.sin(p5.frameCount/10);
    x2 +=p5.sin(p5.frameCount/10);
    
   


  }
  return (
    <div className="App"> 
          <Sketch setup={setup} draw={draw} />
    </div>
  );
}


export default App;
