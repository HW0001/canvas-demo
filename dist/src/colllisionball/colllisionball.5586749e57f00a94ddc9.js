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

/***/ "./src/colllisionball/index.js":
/*!*************************************!*\
  !*** ./src/colllisionball/index.js ***!
  \*************************************/
/***/ (() => {

eval("const canvas = document.getElementById('app')\r\ncanvas.width = window.innerWidth\r\ncanvas.height = window.innerHeight\r\nconst ctx = canvas.getContext(\"2d\")\r\n\r\nfunction Ball(x, y, mass, dx, dy, radius, color) {\r\n    this.x = x;\r\n    this.y = y;\r\n    this.mass = mass;\r\n    this.dx = dx;\r\n    this.dy = dy;\r\n    this.radius = radius;\r\n    this.oldRadius = radius\r\n    this.color = color;\r\n}\r\nBall.prototype = {\r\n    draw() {\r\n        ctx.beginPath()\r\n        ctx.fillStyle = this.color\r\n        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)\r\n        ctx.fill()\r\n    },\r\n    move(particles) {\r\n        //以下碰撞检测的代码涉及的物理知识有点深奥，没看懂，抄的\r\n        // 碰撞检测\r\n        for (let p of particles) {\r\n            if (this === p) continue;\r\n            // 发生碰撞\r\n            if (getDistance(this.x, this.y, p.x, p.y) <= this.radius + p.radius) {\r\n                let xVelDiff = p.dx - this.dx;\r\n                let yVelDiff = p.dy - this.dy;\r\n                let xDist = p.x - this.x;\r\n                let yDist = p.y - this.y;\r\n\r\n                // 判断两个小球是否越来越近，只有越来越近才解决碰撞问题\r\n                if (xVelDiff * xDist + yVelDiff * yDist < 0) {\r\n                    resolveCollision(this, p);\r\n                }\r\n            }\r\n        }\r\n\r\n        if (this.x + this.radius >= canvas.width || this.x - this.radius < 0) {\r\n            this.dx = -this.dx\r\n        }\r\n        if (this.y + this.radius >= canvas.height || this.y - this.radius < 0) {\r\n            this.dy = -this.dy\r\n        }\r\n        this.x += this.dx\r\n        this.y += this.dy\r\n        this.draw()\r\n    }\r\n}\r\n\r\nfunction getDistance(x1, y1, x2, y2) {\r\n    let dx = x1 - x2;\r\n    let dy = y1 - y2;\r\n    return Math.sqrt(dx * dx + dy * dy);\r\n}\r\n/**\r\n * 旋转向量\r\n * @param {*} v\r\n * @param {*} theta\r\n */\r\nfunction rotateVector(v, theta) {\r\n    return {\r\n        dx: v.dx * Math.cos(theta) - v.dy * Math.sin(theta),\r\n        dy: v.dy * Math.cos(theta) + v.dx * Math.sin(theta)\r\n    };\r\n}\r\n/**\r\n * 解决碰撞\r\n * @param {*} p1\r\n * @param {*} p2\r\n */\r\nfunction resolveCollision(p1, p2) {\r\n    let v1 = {\r\n        dx: p1.dx,\r\n        dy: p1.dy\r\n    };\r\n    let v2 = {\r\n        dx: p2.dx,\r\n        dy: p2.dy\r\n    };\r\n\r\n    let theta = -Math.atan2(p1.y - p2.y, p1.x - p2.x);\r\n\r\n    // 旋转速度\r\n    let v1Rotated = rotateVector(v1, theta);\r\n    let v2Rotated = rotateVector(v2, theta);\r\n\r\n    // 通过完全弹性碰撞公式计算新的速度（旋转后的坐标）\r\n    let v1RotatedAfterCollision = {\r\n        dx: (v1Rotated.dx * (p1.mass - p2.mass) + 2 * p2.mass * v2Rotated.dx) / (p1.mass + p2.mass),\r\n        dy: v1Rotated.dy\r\n    };\r\n    let v2RotatedAfterCollision = {\r\n        dx: (v2Rotated.dx * (p2.mass - p1.mass) + 2 * p1.mass * v1Rotated.dx) / (p1.mass + p2.mass),\r\n        dy: v2Rotated.dy\r\n    };\r\n\r\n    // 旋转回原来的坐标系\r\n    let v1AfterCollision = rotateVector(v1RotatedAfterCollision, -theta);\r\n    let v2AfterCollision = rotateVector(v2RotatedAfterCollision, -theta);\r\n\r\n    // 更新小球的速度\r\n    p1.dx = v1AfterCollision.dx;\r\n    p1.dy = v1AfterCollision.dy;\r\n    p2.dx = v2AfterCollision.dx;\r\n    p2.dy = v2AfterCollision.dy;\r\n}\r\n\r\nfunction randomNumber(start, end) {\r\n    return Math.floor(Math.floor(Math.random() * (end + 1) + start))\r\n}\r\nconst ball = new Ball(300, 400, 1, 1, 50, 'red')\r\nconst ballArray = []\r\nconst colorArray = ['#A8C0CE', '#AAB0B5', '#768591', '#DEA800', '#EEEC00']\r\n\r\nfor (let i = 0; i < 200; i++) {\r\n    const raduis = randomNumber(10, 13);\r\n    const x = Math.random() * (canvas.width - raduis * 2) + raduis\r\n    const y = Math.random() * (canvas.height - raduis * 2) + raduis\r\n    const mass = raduis * 0.5\r\n    const dx = +(['-', '+'][randomNumber(0, 1)] + Math.random());\r\n    const dy = +(['-', '+'][randomNumber(0, 1)] + Math.random());\r\n    const color = colorArray[randomNumber(0, 4)]\r\n    ballArray.push(new Ball(x, y, mass, dx, dy, raduis, color))\r\n}\r\n\r\nfunction draw() {\r\n    requestAnimationFrame(draw)\r\n    ctx.clearRect(0, 0, canvas.width, canvas.height)\r\n    ballArray.forEach(e => e.move(ballArray))\r\n}\r\ndraw()\n\n//# sourceURL=webpack://drow/./src/colllisionball/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/colllisionball/index.js"]();
/******/ 	
/******/ })()
;