/* eslint-disable no-lone-blocks */
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
  let focus = 4;
  let fontColor = (0, 0, 0);
  let orbSizeSlider, playerLevelSlider, qualitySlider, chargesSlider, sideSlider;
  let button;
  let qualitySliderValues = ["Common", "Uncommon", "Rare", "Very Rare", "Legendary"];

  const preload = (p5) => {

    font1 = p5.loadFont(font);
  }


  const setup = (p5, canvasParentRef) => {

    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL).parent(canvasParentRef);
    cylWidth = 80;
    cylHeight = 540;


    //The button!!!
    button = p5.createButton('');
    button.style('opacity', "0")
    button.class("btn third");
    button.position(p5.windowWidth / 2 - button.getWidth, p5.windowHeight - p5.windowHeight * .1);


    //button.mousePressed(changeBG);

    //ORB SIZE SLIDER
    orbSizeSlider = p5.createSlider(0, 10, 1);
    orbSizeSlider.value(10);
    orbSizeSlider.position(0, 0);
    orbSizeSlider.style('width', '100px');


    //configSliders
    playerLevelSlider = p5.createSlider(1, 20, 1);
    playerLevelSlider.value(1);
    playerLevelSlider.style('width', '100px');
    playerLevelSlider.position(0, 50);

    qualitySlider = p5.createSlider(1, 5, 1);
    qualitySlider.value(1);
    qualitySlider.style('width', '100px');
    qualitySlider.position(0, 100);

    chargesSlider = p5.createSlider(0, 20, 1);
    chargesSlider.value(1)
    chargesSlider.style('width', '100px');
    chargesSlider.position(0, 150);

    sideSlider = p5.createSlider(-5, 5, 1);
    sideSlider.value(5);
    sideSlider.position(p5.windowWidth / 4, 50);
    sideSlider.style('width', p5.windowWidth.toString() / 2 + 'px');
    sideSlider.style('opacity', '0');
    sideSlider.style('height', p5.windowHeight.toString() / 2 + 'px')

    //Font and text
    p5.textFont(font1);
    p5.textSize(cylWidth);



    p5.frameRate(120);
  }



  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);

    //update the layout
    button.position(p5.windowWidth / 2 - button.getWidth, p5.windowHeight - p5.windowHeight * .1);
    sideSlider.position(p5.windowWidth / 4, 50);
    sideSlider.style('width', p5.windowWidth.toString() / 2 + 'px');
    sideSlider.style('height', p5.windowHeight.toString() / 2 + 'px')

    //button.mousePressed(changeBG);


  }



  const draw = p5 => {


    p5.stroke(0);

    //the light
    p5.ambientLight(12);

    p5.lightFalloff(4 / (orbSizeSlider.value() * Math.abs((p5.sin(p5.millis() / 7500 - .5)))), 0, 0);
    p5.pointLight(255, 255, 255, 0, -cylHeight / 2 - 100, 0);


    //the tower
    p5.push();
    {
      p5.rotateY(rotation);
      p5.fill(255);
      p5.strokeWeight(0);
      p5.fill(40);
      p5.cylinder(cylWidth, cylHeight, 6);

      //the top
      p5.rotateX(p5.PI);
      p5.translate(0, cylHeight / 2 + cylHeight / 6, 0)
      p5.rotateY(p5.PI)
      p5.strokeWeight(9);
      p5.noFill();
      p5.cone(cylWidth, cylHeight / 3, 6);
      //color logic with the slider
      if (orbSizeSlider.value() === 0) {
        p5.stroke(0, 0, 0);
      } else {
        p5.stroke(249, 255, 69);
      }

      //the light orb
      p5.noLights();
      p5.translate(0, -10, 0)
      p5.sphere(cylWidth * orbSizeSlider.value() / 25);
    }
    p5.pop();



    //the rock its on top of as well as the sky behind
    p5.push();
    p5.noStroke();
    p5.rotateY(rotation);
    //sky
    p5.fill('#fae');
    p5.sphere(4000);
    //rock
    var sphereRadius = 10000;
    p5.fill(30, 20, 0);
    p5.translate(0, cylHeight / 2 + sphereRadius, 0);
    p5.sphere(sphereRadius);
    p5.pop();


    //each directional case for the three sides, nothing, and then facing the back
    switch (focus) {
      //the back : Destroy any object large enough to fit into it and add its essence to the tower(0 for common, 5% for uncommon/simple living creature, 10% for powerful non magical being,  15% for Rare/magic user, 25% for Very Rare / magical being, 60% legendary / god )
      case 0:
        rotation = 9 / 6 * p5.PI;
        //title
        p5.push();
        p5.translate(0, 0, 200);
        p5.textSize(100);
        p5.fill(255);
        p5.textAlign(p5.CENTER);
        p5.text("Reduce", 0, p5.windowHeight / 2 - 2 * p5.textSize());
        p5.pop();

        //the Button:
        p5.push();
        button.style('opacity', "100");
        button.html("Reduce your item to Precipitate");
        p5.pop();
        break;

      //side 1 : Recharger - pull a small amount of energy to overcharge any aitem up to 1.5 times its maximum number of charges(rounding down) 
      //cost: 10%
      case 1:
        rotation = 2 * p5.PI / 3;
        //title
        p5.push();
        {
          p5.translate(0, 0, 200);
          p5.textSize(100);
          p5.fill(255);
          p5.textAlign(p5.CENTER);
          p5.text("Recharge", 0, p5.windowHeight / 2 - 2 * p5.textSize());
        }
        p5.pop();

        //the Button:
        p5.push();
        button.style('opacity', "100");
        button.html("Recharge your item up to " + Math.floor(chargesSlider.value() * 1.5));
       // orbSizeSlider.value(orbSizeSlider.value() - 2);
        p5.pop();
        break;

      //side 2 : Reforger - Completly change the essence of the item: try and increase the rarity of the item overall by infusing it with the power of a random plane of existance, do nothing, or sap some of its strength and add it to the tower.
      //cost: 50
      case 2:
        rotation = p5.PI / 6;
        //title
        p5.push();
        p5.translate(0, 0, 200);
        p5.textSize(100);
        p5.fill(255);
        p5.textAlign(p5.CENTER);
        p5.text("Reforge", 0, p5.windowHeight / 2 - 2 * p5.textSize());
        p5.pop();

        //the Button:
        p5.push();
        button.style('opacity', "100");
        let lowQuality = qualitySliderValues[qualitySlider.value() - 2];
        let highQuality = qualitySliderValues[qualitySlider.value() + 1];
        lowQuality ?? (lowQuality = qualitySliderValues[0]);
        highQuality ?? (highQuality =qualitySliderValues[4]);
        button.html("Reforge your item to an item between " + lowQuality + " and " +highQuality);
        p5.pop();
        break;
      //side 3 : Reinfuser - change a magical artifact into something completly new of the same level or +-1 ()
      //cost : 20
      case 3:
        rotation = -p5.PI / 6;
        //title
        p5.push();
        p5.translate(0, 0, 200);
        p5.textSize(100);
        p5.fill(255);
        p5.textAlign(p5.CENTER);
        p5.text("Reinfuse", 0, p5.windowHeight / 2 - 2 * p5.textSize());
        p5.pop();

        //the Button:
        p5.push();
        button.style('opacity', "100");
        button.html("Reduce your item to Precipitate");
        p5.pop();
        break;

      default:
        rotation = 1.3 * p5.sin(p5.millis() / 2500) + 3 * p5.PI / 12;
        //title
        p5.push();
        p5.textSize((rotation + 1) * 10 + 10);
        p5.fill(255);
        p5.textAlign(p5.CENTER);
        p5.text("Welcome to Dark Light Tower", 0, -p5.windowHeight / 2 + p5.textSize());
        p5.pop();
        //the Button:
        p5.push();
        button.style('opacity', "0");
        p5.pop();

    }




    //~~~~~~~ Config sliders ~~~~~~~~~~
    focus = sideSlider.value();
    p5.push();
    p5.textSize(20);
    p5.text(orbSizeSlider.value() * 10, -p5.windowWidth / 2 + 120, -p5.windowHeight / 2 + 20);
    p5.text('PlayerLevel', -p5.windowWidth / 2, -p5.windowHeight / 2 + 45);
    p5.text(playerLevelSlider.value(), -p5.windowWidth / 2 + 120, -p5.windowHeight / 2 + 65);
    p5.text('Quality', -p5.windowWidth / 2, -p5.windowHeight / 2 + 95);
    p5.text(qualitySliderValues[qualitySlider.value() - 1], -p5.windowWidth / 2 + 120, -p5.windowHeight / 2 + 115);
    p5.text('Max Charges', -p5.windowWidth / 2, -p5.windowHeight / 2 + 145);
    p5.text(chargesSlider.value(), -p5.windowWidth / 2 + 120, -p5.windowHeight / 2 + 165);
    p5.pop();



    //~~~~~~~~~~~~~~~~~~~ the sides ~~~~~~~~~~~~~~~~~~
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


  }


  const mouseClicked = p5 => {
    //focus++;
  }


  return (
    <div className="App" overflow="hidden">
      <Sketch setup={setup} draw={draw} preload={preload} windowResized={windowResized} mouseClicked={mouseClicked} />
    </div>
  );
}


export default App;
