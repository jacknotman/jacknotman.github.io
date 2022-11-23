//
// Setup
//

// Import Frames.js class
import { default as Frames } from "./../../src/Frames.js";

// Useful Hack for ios safari setting a CSS variable equal to the active viewport height.
const appHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight();

//
// Main
//

// Create an array of characters for our animation to use.
const characterArray = 
`Hello World,
Welcome to Frames.

The animation scheduling protocol for js. 

488 bytes of code.
275 gZipped. 
Awesome.`.split('');

// Create an element for our animations
const element = document.createElement('span');
element.ariaLive = "assertive"
element.ariaBusy = "true";
document.querySelector('.content').appendChild(element);

// Loops over the above character array, printing a character approximately 
// every 40 miliseconds. 
const x = new Frames(characterArray, frame => {
	return new Promise(resolve => {
		setTimeout(() => {
			element.innerHTML += frame;
			//window.scrollTo(0, element.offsetHeight);
			resolve();
		}, 40);
	});
});

/*
x.animate().then(([self, time]) => {
  element.ariaBusy = "false";
  console.log(`Done in: ${time}ms`);
});
*/

//Perfrom the animation 10 times, clearing the output between each frame (except the last), after a delay of 160ms, 
//before the next frame. 
x.loop(iterationCount => {
	return iterationCount < 10;
}, (iterationCount, done) => {
	return new Promise(resolve => {
		setTimeout(() => {
			if(!done) element.innerHTML = '';
			resolve();
		}, 160);
	});
});
