/// <reference path="../TSDef/p5.d.ts" />
import './App.css';
import React from 'react'
import Sketch from 'react-p5';
import font from "./assets/Inconsolata/Inconsolata-Bold.ttf";


function App() {
  // Constants
  let font1;
  let rotation;
  let cylWidth, cylHeight;
  let focus = 0;
  let orbSizeSlider;
  let fontColor = (0, 0, 0);
  const preload = (p5) => {

    font1 = p5.loadFont(font);
  }


  const setup = (p5, canvasParentRef) => {

    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL).parent(canvasParentRef);
    cylWidth = 80;
    cylHeight = 400;

    //ORB SIZE
    orbSizeSlider = p5.createSlider(2.5, 10.5, .25);
    orbSizeSlider.value(10);
    orbSizeSlider.position(0, 0);
    orbSizeSlider.style('width', '100px');

    //Font and text
    p5.textFont(font1);
    p5.textSize(cylWidth);



    p5.frameRate(120);
  }



  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  }



  const draw = p5 => {

    switch (focus % 4) {
      case 0:
        rotation = 1.3 * p5.sin(p5.millis() / 2500) + 3 * p5.PI / 12;
        break;
      case 1:
        rotation = 2 * p5.PI / 3;
        break;
      case 2:
        rotation = p5.PI / 6;
        break;
      case 3:
        rotation = -p5.PI / 6;
        break;
      default:
        rotation = 1.3 * p5.sin(p5.millis() / 2500) + 3 * p5.PI / 12;

    }

    p5.stroke(0);

    //the light
    p5.ambientLight(12);

    p5.lightFalloff(4 / orbSizeSlider.value(), 0, 0);
    p5.pointLight(255, 255, 255, 0, -cylHeight / 2 - 100, 0);


    //the tower
    p5.push();
    p5.rotateY(rotation);
    p5.fill(255);
    p5.strokeWeight(1);
    p5.fill(0);
    p5.cylinder(cylWidth, cylHeight, 6);

    //the top
    p5.rotateX(p5.PI);
    p5.translate(0, cylHeight / 2 + cylHeight / 6, 0)
    p5.rotateY(p5.PI)
    p5.strokeWeight(5);
    p5.noFill();
    p5.cone(cylWidth, cylHeight / 3, 6);
    //color logic with the slider
    if (orbSizeSlider.value() === 2.5) {
      p5.stroke(0, 0, 0);
    } else {
      p5.stroke(249, 255, 69);
    }
    //the light orb
    p5.noLights();
    p5.translate(0, -10, 0)
    p5.sphere(cylWidth * orbSizeSlider.value() / 25);
    p5.pop();



    //the rock its on top of as well as the sky behind
    p5.noStroke();
    p5.push();
    p5.rotateY(rotation);
    //sky
    p5.fill('#fae');

    p5.sphere(5000);


    //rock
    var sphereRadius = 10000;
    p5.fill(30, 20, 0);

    p5.translate(0, cylHeight / 2 + sphereRadius, 0);
    p5.sphere(sphereRadius);

    p5.pop();

    var fntclrnum;
    //side 1
    p5.push();
    fntclrnum = orbSizeSlider.value() / 10 * (p5.map(rotation, -p5.PI / 6, p5.PI / 6, p5.PI / 4, p5.PI) - p5.PI / 4);
    fontColor = (p5.degrees(fntclrnum), p5.degrees(fntclrnum), p5.degrees(fntclrnum));


    //orient
    p5.rotateY(rotation - 2 * p5.PI / 3);

    //text
    p5.push();
    p5.fill(fontColor);
    p5.translate(-cylWidth / 2 + 15, -cylHeight / 2, 85);
    p5.rotateZ(p5.HALF_PI);
    p5.text('€', 0, 0);
    p5.pop();
    p5.pop();


    //side 2
    p5.push();
    fntclrnum = orbSizeSlider.value() / 5 * Math.abs(p5.PI - 2 * Math.abs(rotation - p5.PI / 6));
    console.log(fntclrnum);
    console.log("rotation: " + rotation);
    fontColor = (p5.degrees(fntclrnum), p5.degrees(fntclrnum), p5.degrees(fntclrnum));

    //orient
    p5.rotateY(rotation - p5.PI / 6);
    //text
    p5.fill(fontColor);
    p5.translate(-cylWidth / 2, -cylHeight / 2, 85);
    p5.rotateX(p5.PI);
    p5.text('¥', 0, 0);
    p5.pop();


    //side 3
    p5.push();
    fntclrnum = orbSizeSlider.value() / 10 * (p5.TAU - p5.map(rotation, -p5.PI / 6, p5.PI / 6, p5.PI / 4, p5.PI) - p5.PI / 4);
    fontColor = (p5.degrees(fntclrnum), p5.degrees(fntclrnum), p5.degrees(fntclrnum));

    //orient
    p5.rotateY(rotation + p5.PI / 6);
    //text
    p5.fill(fontColor);
    p5.translate(-cylWidth / 2, -cylHeight / 2, 85);
    p5.rotateZ(p5.HALF_PI);
    p5.text('¢', 0, 0);
    p5.pop();


    //link in the top left corner
  }


  const mouseClicked = p5 => {
    focus++;
  }


  return (
    <div className="App" overflow="hidden">
      <Sketch setup={setup} draw={draw} preload={preload} windowResized={windowResized} mouseClicked={mouseClicked} />
    </div>
  );
}


export default App;
