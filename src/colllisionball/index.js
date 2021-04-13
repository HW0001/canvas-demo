const canvas = document.getElementById('app')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d")

function Ball(x, y, mass, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.mass = mass;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.oldRadius = radius
    this.color = color;
}
Ball.prototype = {
    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
    },
    move(particles) {
        //以下碰撞检测的代码涉及的物理知识有点深奥，没看懂，抄的
        // 碰撞检测
        for (let p of particles) {
            if (this === p) continue;
            // 发生碰撞
            if (getDistance(this.x, this.y, p.x, p.y) <= this.radius + p.radius) {
                let xVelDiff = p.dx - this.dx;
                let yVelDiff = p.dy - this.dy;
                let xDist = p.x - this.x;
                let yDist = p.y - this.y;

                // 判断两个小球是否越来越近，只有越来越近才解决碰撞问题
                if (xVelDiff * xDist + yVelDiff * yDist < 0) {
                    resolveCollision(this, p);
                }
            }
        }

        if (this.x + this.radius >= canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx
        }
        if (this.y + this.radius >= canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy
        }
        this.x += this.dx
        this.y += this.dy
        this.draw()
    }
}

function getDistance(x1, y1, x2, y2) {
    let dx = x1 - x2;
    let dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}
/**
 * 旋转向量
 * @param {*} v
 * @param {*} theta
 */
function rotateVector(v, theta) {
    return {
        dx: v.dx * Math.cos(theta) - v.dy * Math.sin(theta),
        dy: v.dy * Math.cos(theta) + v.dx * Math.sin(theta)
    };
}
/**
 * 解决碰撞
 * @param {*} p1
 * @param {*} p2
 */
function resolveCollision(p1, p2) {
    let v1 = {
        dx: p1.dx,
        dy: p1.dy
    };
    let v2 = {
        dx: p2.dx,
        dy: p2.dy
    };

    let theta = -Math.atan2(p1.y - p2.y, p1.x - p2.x);

    // 旋转速度
    let v1Rotated = rotateVector(v1, theta);
    let v2Rotated = rotateVector(v2, theta);

    // 通过完全弹性碰撞公式计算新的速度（旋转后的坐标）
    let v1RotatedAfterCollision = {
        dx: (v1Rotated.dx * (p1.mass - p2.mass) + 2 * p2.mass * v2Rotated.dx) / (p1.mass + p2.mass),
        dy: v1Rotated.dy
    };
    let v2RotatedAfterCollision = {
        dx: (v2Rotated.dx * (p2.mass - p1.mass) + 2 * p1.mass * v1Rotated.dx) / (p1.mass + p2.mass),
        dy: v2Rotated.dy
    };

    // 旋转回原来的坐标系
    let v1AfterCollision = rotateVector(v1RotatedAfterCollision, -theta);
    let v2AfterCollision = rotateVector(v2RotatedAfterCollision, -theta);

    // 更新小球的速度
    p1.dx = v1AfterCollision.dx;
    p1.dy = v1AfterCollision.dy;
    p2.dx = v2AfterCollision.dx;
    p2.dy = v2AfterCollision.dy;
}

function randomNumber(start, end) {
    return Math.floor(Math.floor(Math.random() * (end + 1) + start))
}
const ball = new Ball(300, 400, 1, 1, 50, 'red')
const ballArray = []
const colorArray = ['#A8C0CE', '#AAB0B5', '#768591', '#DEA800', '#EEEC00']

for (let i = 0; i < 200; i++) {
    const raduis = randomNumber(10, 13);
    const x = Math.random() * (canvas.width - raduis * 2) + raduis
    const y = Math.random() * (canvas.height - raduis * 2) + raduis
    const mass = raduis * 0.5
    const dx = +(['-', '+'][randomNumber(0, 1)] + Math.random());
    const dy = +(['-', '+'][randomNumber(0, 1)] + Math.random());
    const color = colorArray[randomNumber(0, 4)]
    ballArray.push(new Ball(x, y, mass, dx, dy, raduis, color))
}

function draw() {
    requestAnimationFrame(draw)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ballArray.forEach(e => e.move(ballArray))
}
draw()