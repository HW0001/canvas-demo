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

/***/ "./src/random/index.js":
/*!*****************************!*\
  !*** ./src/random/index.js ***!
  \*****************************/
/***/ (() => {

eval("const canvas = document.getElementById('app')\r\ncanvas.width = window.innerWidth\r\ncanvas.height = window.innerHeight\r\nconst ctx = canvas.getContext(\"2d\")\r\n\r\nconst moveTo = {\r\n    x: -10,\r\n    y: -10,\r\n    maxRadius: 40,\r\n    minRadius: 5\r\n}\r\n\r\nwindow.addEventListener(\"mousemove\", (e) => {\r\n    moveTo.x = e.offsetX\r\n    moveTo.y = e.offsetY\r\n})\r\nwindow.addEventListener(\"resize\", () => {\r\n    canvas.width = window.innerWidth\r\n    canvas.height = window.innerHeight\r\n})\r\n\r\nfunction Ball(x, y, dx, dy, radius, color) {\r\n    this.x = x;\r\n    this.y = y;\r\n    this.dx = dx;\r\n    this.dy = dy;\r\n    this.radius = radius;\r\n    this.oldRadius = radius\r\n    this.color = color;\r\n}\r\nBall.prototype = {\r\n    draw() {\r\n        ctx.beginPath()\r\n        ctx.fillStyle = this.color\r\n        if (Math.abs(moveTo.x - (this.x + this.radius)) < 50 && Math.abs(moveTo.y - (this.y + this.radius)) < 50) {\r\n            this.radius >= moveTo.maxRadius ? this.radius : this.radius += 1\r\n        } else {\r\n            this.radius <= moveTo.minRadius ? this.radius : this.radius -= 1\r\n        }\r\n        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)\r\n        ctx.fill()\r\n    },\r\n    move() {\r\n        if (this.x + this.radius >= canvas.width || this.x - this.radius < 0) {\r\n            this.dx = -this.dx\r\n        }\r\n        if (this.y + this.radius >= canvas.height || this.y - this.radius < 0) {\r\n            this.dy = -this.dy\r\n        }\r\n        this.x += this.dx\r\n        this.y += this.dy\r\n        this.draw()\r\n    }\r\n}\r\n\r\nfunction randomNumber(start, end) {\r\n    return Math.floor(Math.floor(Math.random() * (end + 1) + start))\r\n}\r\nconst ball = new Ball(300, 400, 1, 1, 50, 'red')\r\nconst ballArray = []\r\nconst colorArray = ['#A8C0CE', '#AAB0B5', '#768591', '#DEA800', '#EEEC00']\r\n\r\nfor (let i = 0; i < 200; i++) {\r\n    const raduis = randomNumber(1, 3);\r\n    const x = Math.random() * (canvas.width - raduis * 2) + raduis\r\n    const y = Math.random() * (canvas.height - raduis * 2) + raduis\r\n    const dx = +(['-', '+'][randomNumber(0, 1)] + randomNumber(1, 2));\r\n    const dy = +(['-', '+'][randomNumber(0, 1)] + randomNumber(1, 2));\r\n    const color = colorArray[randomNumber(0, 4)]\r\n    ballArray.push(new Ball(x, y, dx, dy, raduis, color))\r\n}\r\n\r\nfunction draw() {\r\n    requestAnimationFrame(draw)\r\n    ctx.clearRect(0, 0, canvas.width, canvas.height)\r\n    ballArray.forEach(e => e.move())\r\n}\r\ndraw()\n\n//# sourceURL=webpack://drow/./src/random/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/random/index.js"]();
/******/ 	
/******/ })()
;