const canvas = document.getElementById('app')
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

function randomNumber(start, end) {
    return Math.floor(Math.floor(Math.random() * (end + 1) + start))
}

function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
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
    move() {
        if (this.y + this.radius + 0.8 + this.dy > canvas.height) {
            this.dy = -this.dy
            this.dy *= 0.9
            this.dx *= 0.9
        } else {
            this.dy += 0.8
        }
        if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx
        }
        this.y += this.dy
        this.x += this.dx
        this.draw()
    }
}

let ballArray = []
const colorArray = ['#A8C0CE', '#AAB0B5', '#768591', '#DEA800', '#EEEC00']

function init() {
    ballArray = []
    for (let i = 0; i < 200; i++) {
        const raduis = randomNumber(1, 15);
        const x = Math.floor(Math.random() * (canvas.width - raduis * 2) + raduis)
        const y = Math.floor(Math.random() * (canvas.height - raduis * 2) + raduis)
        const dx = [4, -4][randomNumber(0, 1)];
        const dy = 1;
        const color = colorArray[randomNumber(0, 3)]
        ballArray.push(new Ball(x, y, dx, dy, raduis, color))
    }
}

function draw() {
    requestAnimationFrame(draw)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ballArray.forEach(e => e.move())
}
init()
draw()
window.addEventListener("mousedown", (e) => {
    init()
})