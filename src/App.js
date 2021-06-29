/// <reference path="../TSDef/p5.d.ts" />
import './App.css';
import React from 'react'
import Sketch from 'react-p5';
import p5Types from "p5";
import font from "./assets/Inconsolata/Inconsolata-Light.ttf";


function App() {
  // Constants
  let c1,c2,n;
  let font1;
  let x1;
  let x2;
  let a;

  const preload = (p5) => {
    x1=0;
    x2=0;
    a = p5.createA("https://lukeknight.site","Linkers");

    font1 = p5.loadFont(font);
  }


  const setup = (p5, canvasParentRef) => {
   
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL).parent(canvasParentRef);

    c1 = p5.color(0);
    c2 = p5.color(55, 77, 51);
    
    for(let y=-p5.height/2; y<p5.height/2; y++){
      n = p5.map(y,-p5.height/2,p5.height/2,0,1);
      let newc = p5.lerpColor(c1,c2,n);
      p5.stroke(newc);
      //p5.lineWidth(1);
      p5.line(-p5.width/2,y,p5.width/2, y);
    }


    //Font and text
    p5.textFont(font1);
    p5.textSize(p5.width / 10);
    


    p5.frameRate(30);
  }



  const windowResized = (p5) => {
    x1=0;
    x2=0;
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  }



  const draw = p5 => {
    
    p5.rotateY(p5.millis()/1000);
    p5.rotateZ(p5.millis()/3000);
   
    p5.push();
      p5.fill(255);  
      p5.strokeWeight(1);
      
      p5.cylinder(80  , 400, 6);
      
     
    p5.pop();
    p5.push();
      p5.fill(0); 
      p5.translate(0,0,100); 
      p5.text('YeahBB', 0, 0);
    p5.pop();

    a.position(x1,x2);
  }


  return (
    <div className="App" overflow= "hidden"> 
          <Sketch setup={setup} draw={draw} preload={preload} windowResized={windowResized}/>
    </div>
  );
}


export default App;
