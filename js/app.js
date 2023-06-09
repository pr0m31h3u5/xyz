// function ASCIIAnimation(animArray, speed, DOMtarget) {
//   var currentFrame = 0;
// 	for(var i = 0; i < animArray.length; i++) {
// 		animArray[i] = animArray[i].replace(/ /g,"&nbsp;");
// 		animArray[i] = "<pre>" + animArray[i] + "</pre>";
// 	}
// 	DOMtarget.innerHTML = animArray[0];
// 	currentFrame++;
// 	this.animation = setInterval(function() {
// 		DOMtarget.innerHTML = animArray[currentFrame];
// 		currentFrame++;
// 		if(currentFrame >= animArray.length) currentFrame = 0;
// 	}, speed);
// 	this.getCurrentFrame = function() {
// 		return currentFrame;
// 	}
// }

// ASCIIAnimation.prototype.stopAnimation = function() {
// 	clearInterval(this.animation);
// }
//       var div4 = makeDiv();
// bodyAppend(div4);
// div4.style.fontFamily = "monospace";
// var animArray4 = [
// 	"[>    ]",
// 	"[>>   ]",
// 	"[>>>  ]",
// 	"[ >>> ]",
// 	"[  >>>]",
// 	"[   >>]",
// 	"[    >]",
// 	"[     ]"
// ];


// /* Store the element in el */
// let el = document.getElementById('lineHref')

// /* Get the height and width of the element */
// const height = el.clientHeight
// const width = el.clientWidth

// /*
//   * Add a listener for mousemove event
//   * Which will trigger function 'handleMove'
//   * On mousemove
//   */
// el.addEventListener('mousemove', handleMove)

// /* Define function a */
// function handleMove(e) {
//   /*
//     * Get position of mouse cursor
//     * With respect to the element
//     * On mouseover
//     */
//   /* Store the x position */
//   const xVal = e.layerX
//   /* Store the y position */
//   const yVal = e.layerY
  
//   /*
//     * Calculate rotation valuee along the Y-axis
//     * Here the multiplier 20 is to
//     * Control the rotation
//     * You can change the value and see the results
//     */
//   const yRotation = 20 * ((xVal - width / 2) / width)
  
//   /* Calculate the rotation along the X-axis */
//   const xRotation = -20 * ((yVal - height / 2) / height)
  
//   /* Generate string for CSS transform property */
//   const string = 'perspective(500px) scale(1.1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)'
  
//   /* Apply the calculated transformation */
//   el.style.transform = string
// }

// /* Add listener for mouseout event, remove the rotation */
// el.addEventListener('mouseout', function() {
//   el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
// })

// /* Add listener for mousedown event, to simulate click */
// el.addEventListener('mousedown', function() {
//   el.style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)'
// })

// /* Add listener for mouseup, simulate release of mouse click */
// el.addEventListener('mouseup', function() {
//   el.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)'
// })

// var AsciiMorph = (function() {

//     'use strict';
    
//     var element = null;
//     var canvasDimensions = {};
    
//     var renderedData = [];
//     var framesToAnimate = [];
//     var myTimeout = null;
    
//     /**
//      * Utils
//      */
  
//     function extend(target, source) {
//       for (var key in source) {
//         if (!(key in target)) {
//           target[key] = source[key];              
//         }
//       }
//       return target;
//     }
    
//     function repeat(pattern, count) {
//         if (count < 1) return '';
//         var result = '';
//         while (count > 1) {
//             if (count & 1) result += pattern;
//             count >>= 1, pattern += pattern;
//         }
//         return result + pattern;
//     }
    
//     function replaceAt(string, index, character ) {
//       return string.substr(0, index) + character + string.substr(index+character.length);
//     }
    
//     /**
//      * AsciiMorph
//      */
  
//     function init(el, canvasSize) {
      
//       // Save the element
//       element = el;
//       canvasDimensions = canvasSize;
//     }
    
//     function squareOutData(data) {
//        var i;
//       var renderDimensions = {
//         x: 0,
//         y: data.length
//       };
  
//       // Calculate centering numbers
//       for( i = 0; i < data.length; i++ ) {
//         if( data[i].length > renderDimensions.x) {
//           renderDimensions.x = data[i].length
//         }
//       }
      
//       // Pad out right side of data to square it out
//       for( i = 0; i < data.length; i++ ) {
//         if( data[i].length < renderDimensions.x) {
//           data[i] = (data[i] + repeat(' ', renderDimensions.x - data[i].length ));
//         }
//       }
      
//       var paddings = {
//         x: Math.floor((canvasDimensions.x - renderDimensions.x) / 2),
//         y: Math.floor((canvasDimensions.y - renderDimensions.y) / 2)
//       }
      
//       // Left Padding
//       for( var i = 0; i < data.length; i++ ) {
//         data[i] = repeat(' ', paddings.x) + data[i] + repeat(' ', paddings.x);
//       }
      
//       // Pad out the rest of everything
//       for( var i = 0; i < canvasDimensions.y; i++ ) {
//         if( i < paddings.y) {
//           data.unshift( repeat(' ', canvasDimensions.x));
//         } else if (i > (paddings.y + renderDimensions.y)) {
//           data.push( repeat(' ', canvasDimensions.x));
//         }
//       }
      
//       return data;
//     }
    
//     // Crushes the frame data by 1 unit.
//     function getMorphedFrame(data) {
      
//       var firstInLine, lastInLine = null;
//       var found = false;
//       for( var i = 0; i < data.length; i++) {
        
//         var line = data[i];
//         firstInLine = line.search(/\S/);
//         if( firstInLine === -1) {
//           firstInLine = null;
//         }
        
//         for( var j = 0; j < line.length; j++) {
//           if( line[j] != ' ') {
//             lastInLine = j;
//           }
//         }
        
//         if( firstInLine !== null && lastInLine !== null) {
//           data = crushLine(data, i, firstInLine, lastInLine)
//           found = true;
//         }
    
//         firstInLine = null, lastInLine = null;
//       }
      
//       if( found ) {
//         return data;
//       } else {
//         return false;
//       }
//     }
    
//     function crushLine(data, line, start, end) {
      
//       var centers = {
//         x: Math.floor(canvasDimensions.x / 2),
//         y: Math.floor(canvasDimensions.y / 2)
//       }
      
//       var crushDirection = 1;
//       if( line > centers.y ) {
//         crushDirection = -1;
//       }
      
//       var charA = data[line][start];
//       var charB = data[line][end];
      
//       data[line] = replaceAt(data[line], start, " ");
//       data[line] = replaceAt(data[line], end, " ");
  
//       if( !((end - 1) == (start + 1)) && !(start === end) && !((start + 1) === end)) {
//         data[line + crushDirection] = replaceAt(data[line + crushDirection], (start + 1), '+*/\\'.substr(Math.floor(Math.random()*'+*/\\'.length), 1));
//         data[line + crushDirection] = replaceAt(data[line + crushDirection], (end - 1), '+*/\\'.substr(Math.floor(Math.random()*'+*/\\'.length), 1));
//       } else if ((((start === end) || (start + 1) === end)) && ((line + 1) !== centers.y && (line - 1) !== centers.y && line !== centers.y)) {
//         data[line + crushDirection] = replaceAt(data[line + crushDirection], (start), '+*/\\'.substr(Math.floor(Math.random()*'+*/\\'.length), 1));
//         data[line + crushDirection] = replaceAt(data[line + crushDirection], (end), '+*/\\'.substr(Math.floor(Math.random()*'+*/\\'.length), 1));
//       }
      
//       return data;
//     }
    
//     function render(data) {
//       var ourData = squareOutData(data.slice());
//       renderSquareData(ourData);
//     }
    
//     function renderSquareData(data) {
//       element.innerHTML = '';
//       for( var i = 0; i < data.length; i++ ) {
//         element.innerHTML = element.innerHTML + data[i] + '\n';
//       }
      
//       renderedData = data;
//     }
    
//     // Morph between whatever is current, to the new frame
//     function morph(data) {
      
//       clearTimeout(myTimeout);
//       var frameData = prepareFrames(data.slice());
//       animateFrames(frameData);
//     }
    
//     function prepareFrames(data) {
      
//       var deconstructionFrames = [];
//       var constructionFrames = [];
  
//       var clonedData = renderedData
      
//       // If its taking more than 100 frames, its probably somehow broken
//       // Get the deconscrution frames
//       for(var i = 0; i < 100; i++) {
//         var newData = getMorphedFrame(clonedData);
//         if( newData === false) {
//           break;
//         }
//         deconstructionFrames.push(newData.slice(0)); 
//         clonedData = newData;
//       }
      
//       // Get the constuction frames for the new data
//       var squareData = squareOutData(data);
//       constructionFrames.unshift(squareData.slice(0));
//       for( var i = 0; i < 100; i++ ) {
//         var newData = getMorphedFrame(squareData);
//         if( newData === false) {
//           break;
//         }
//         constructionFrames.unshift(newData.slice(0));
//         squareData = newData;
//       }
      
//       return deconstructionFrames.concat(constructionFrames)
//     }
    
//     function animateFrames(frameData) {
//       framesToAnimate = frameData;
//       animateFrame();
//     }
    
//     function animateFrame() {
//       myTimeout = setTimeout(function() {
        
//         renderSquareData(framesToAnimate[0]);
//         framesToAnimate.shift();
//         if( framesToAnimate.length > 0 ) {
//           animateFrame();
//         }
//       }, 20)
  
//       // framesToAnimate
//     }
  
//     function main(element, canvasSize) {
      
//       if( !element || !canvasSize ) {
//         console.log("sorry, I need an element and a canvas size");
//         return;   
//       }
      
//       init(element, canvasSize);
//     }
  
//     return extend(main, {
//       render: render,
//       morph: morph
//     });
    
//   })();
  
//   var element = document.querySelector('pre');
//   AsciiMorph(element, {x: 51,y: 28});
  
//   var asciis = [[
//   "                _ooOoo_",
//   "               o8888888o",
//   "               88\" . \"88",
//   "               (| -_- |)",
//   "               O\\  =  /O",
//   "            ____/`---'\\____",
//   "          .'  \\\\|     |//  `.",
//   "         /  \\\\|||  :  |||//  \\",
//   "        /  _||||| -:- |||||_  \\",
//   "        |   | \\\\\\  -  /'| |   |",
//   "        | \\_|  `\\`---'//  |_/ |",
//   "        \\  .-\\__ `-. -'__/-.  /",
//   "      ___`. .'  /--.--\\  `. .'___",
//   "   .\"\" '<  `.___\\_<|>_/___.' _> \\\"\".",
//   "  | | :  `- \\`. ;`. _/; .'/ /  .' ; |",
//   "  \\  \\ `-.   \\_\\_`. _.'_/_/  -' _.' /",
//   "===`-.`___`-.__\\ \\___  /__.-'_.'_.-'===",
//   "                `=--=-'    "
//   ],
  
//   [
//   "                             /",
//   "                            /",
//   "                           /;",
//   "                          //",
//   "                         ;/",
//   "                       ,//",
//   "                   _,-' ;_,,",
//   "                _,'-_  ;|,'",
//   "            _,-'_,..--. |",
//   "    ___   .'-'_)'  ) _)\\|      ___",
//   "  ,'\"\"\"`'' _  )   ) _)  ''--'''_,-'",
//   "-={-o-  /|    )  _)  ) ; '_,--''",
//   "  \\ -' ,`.  ) .)  _)_,''|",
//   "   `.\"(   `------''     /",
//   "     `.\\             _,'",
//   "       `-.____....-\\\\",
//   "                 || \\\\",
//   "                 // ||",
//   "                //  ||",
//   "            _-.//_ _||_,",
//   "              ,'  ,-'/"
//   ],
  
//   [
//   "      \\`.     ___",
//   "       \\ \\   / __>0",
//   "   /\\  /  |/' / ",
//   "  /  \\/   `  ,`'--.",
//   " / /(___________)_ \\",
//   " |/ //.-.   .-.\\\\ \\ \\",
//   " 0 // :@ ___ @: \\\\ \/",
//   "   ( o ^(___)^ o ) 0",
//   "    \\ \\_______/ /",
//   "/\\   '._______.'--.",
//   "\\ /|  |<_____>    |",
//   " \\ \\__|<_____>____/|__",
//   "  \\____<_____>_______/",
//   "      |<_____>    |",
//   "      |<_____>    |",
//   "      :<_____>____:",
//   "     / <_____>   /|",
//   "    /  <_____>  / |",
//   "   /___________/  |",
//   "   |           | _|__",
//   "   |           | ---||_",
//   "   |   |L\\/|/  |  | [__]",
//   "   |  \\|||\\|\\  |  /",
//   "   |           | /",
//   "   |___________|/"
//   ],
  
//   [
//   "     .--------.",
//   "    / .------. \\",
//   "   / /        \\ \\",
//   "   | |        | |",
//   "  _| |________| |_",
//   ".' |_|        |_| '.",
//   "'._____ ____ _____.'",
//   "|     .'____'.     |",
//   "'.__.'.'    '.'.__.'",
//   "'.__  |      |  __.'",
//   "|   '.'.____.'.'   |",
//   "'.____'.____.'____.'",
//   "'.________________.'",
//   ],
  
//   [
//   "         ____",
//   "        o8%8888,",
//   "      o88%8888888.",
//   "     8'-    -:8888b",
//   "    8'         8888",
//   "   d8.-=. ,==-.:888b",
//   "   >8 `~` :`~' d8888",
//   "   88         ,88888",
//   "   88b. `-~  ':88888",
//   "   888b ~==~ .:88888",
//   "   88888o--:':::8888",
//   "   `88888| :::' 8888b",
//   "   8888^^'       8888b",
//   "  d888           ,%888b.",
//   " d88%            %%%8--'-.",
//   "/88:.__ ,       _%-' ---  -",
//   "    '''::===..-'   =  --.  `",
//    ],
  
//    [
//   "      _      _      _",
//   "   __(.)< __(.)> __(.)=",
//   "   \\___)  \\___)  \\___)  ",
//   "          _      _      _",
//   "       __(.)< __(.)> __(.)=",
//   "       \\___)  \\___)  \\___)   ",
//   "      _      _      _",
//   "   __(.)< __(.)> __(.)=",
//   "   \\___)  \\___)  \\___)   ",
//   "          _      _      _",
//   "       __(.)< __(.)> __(.)=",
//   "       \\___)  \\___)  \\___)  "
//    ]];
  
//   AsciiMorph.render(asciis[0]);
  
//   var currentIndex = 2;
  
//   setTimeout(function() {
//     AsciiMorph.morph(asciis[1]);
//   }, 1000);
  
//   setInterval(function() {
//     AsciiMorph.morph(asciis[currentIndex]);
//     currentIndex++;
//     currentIndex%= asciis.length;
//   }, 3000);

function runningline(msg,ctrlwidth)
        {
        msg = " "+msg
        newmsg = msg
        while (newmsg.length < ctrlwidth) {newmsg += msg}
        document.write ('<form name="Tekst">')
        document.write ('<input name="tekst" style="border:0;font-weight:bold;color:antiquewhite;background-color:black;width:100%;" value= "'+newmsg+'" size= '+ctrlwidth+' />')
        document.write ('</form>')
        prokrutka()
        }
        function prokrutka()
        {
        NowMsg=document.Tekst.tekst.value
        NowMsg=NowMsg.substring(1,NowMsg.length)+NowMsg.substring(0,1)
        document.Tekst.tekst.value = NowMsg
        bannerid=setTimeout("prokrutka()",200)
        }

        