/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dragball/index.js":
/*!*******************************!*\
  !*** ./src/dragball/index.js ***!
  \*******************************/
/***/ (() => {

eval("const canvas = document.getElementById('app')\r\ncanvas.width = window.innerWidth\r\ncanvas.height = window.innerHeight\r\nconst ctx = canvas.getContext(\"2d\")\r\n\r\nconst mouse = {\r\n    x: window.innerWidth / 2,\r\n    y: window.innerHeight / 2\r\n}\r\nwindow.addEventListener('mousemove', function(event) {\r\n    mouse.x = event.clientX;\r\n    mouse.y = event.clientY;\r\n});\r\nwindow.addEventListener(\"mousemove\", (e) => {\r\n    moveTo.x = e.offsetX\r\n    moveTo.y = e.offsetY\r\n})\r\n\r\nfunction Ball(x, y, radius, color) {\r\n    this.x = x;\r\n    this.y = y;\r\n    this.radius = radius;\r\n    this.color = color;\r\n    this.theta = Math.random() * Math.PI * 2;\r\n    this.distance = randomNumber(40, 60);\r\n    this.speed = 0.05\r\n    this.dragSpeed = 0.1\r\n    this.lastMouse = {\r\n        x: x,\r\n        y: y\r\n    }\r\n}\r\nBall.prototype = {\r\n    draw(lastPosition) {\r\n        ctx.beginPath()\r\n        ctx.strokeStyle = this.color\r\n        ctx.lineWidth = this.radius\r\n        ctx.moveTo(lastPosition.x, lastPosition.y)\r\n        ctx.lineTo(this.x, this.y)\r\n        ctx.stroke()\r\n    },\r\n    move() {\r\n        let lastPosition = {\r\n            x: this.x,\r\n            y: this.y\r\n        }\r\n        this.lastMouse.x += (mouse.x - this.lastMouse.x) * this.dragSpeed;\r\n        this.lastMouse.y += (mouse.y - this.lastMouse.y) * this.dragSpeed;\r\n\r\n        this.x = this.lastMouse.x + Math.cos(this.theta) * this.distance;\r\n        this.y = this.lastMouse.y + Math.sin(this.theta) * this.distance;\r\n\r\n        this.theta += this.speed;\r\n        this.draw(lastPosition)\r\n    }\r\n}\r\n\r\nfunction randomNumber(start, end) {\r\n    return Math.floor(Math.random() * (end + 1) + start)\r\n}\r\nconst ballArray = []\r\nconst colorArray = ['#A8C0CE', '#AAB0B5', '#768591', '#DEA800', '#EEEC00']\r\n\r\nfor (let i = 0; i < 100; i++) {\r\n    const raduis = 3;\r\n    const x = canvas.width / 2\r\n    const y = canvas.height / 2\r\n    const color = colorArray[randomNumber(0, 4)]\r\n    ballArray.push(new Ball(x, y, raduis, color))\r\n}\r\n\r\nfunction draw() {\r\n    requestAnimationFrame(draw)\r\n    ctx.fillStyle = 'rgba(255,255,255,0.1)'\r\n    ctx.fillRect(0, 0, canvas.width, canvas.height)\r\n    ballArray.forEach(e => e.move())\r\n}\r\ndraw()\n\n//# sourceURL=webpack://drow/./src/dragball/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/dragball/index.js"]();
/******/ 	
/******/ })()
;