const canvas = document.getElementById('app')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d")

const moveTo = {
    x: -10,
    y: -10,
    maxRadius: 40,
    minRadius: 5
}

window.addEventListener("mousemove", (e) => {
    moveTo.x = e.offsetX
    moveTo.y = e.offsetY
})
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

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
        if (Math.abs(moveTo.x - (this.x + this.radius)) < 50 && Math.abs(moveTo.y - (this.y + this.radius)) < 50) {
            this.radius >= moveTo.maxRadius ? this.radius : this.radius += 1
        } else {
            this.radius <= moveTo.minRadius ? this.radius : this.radius -= 1
        }
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
    },
    move() {
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

const ball = new Ball(300, 400, 1, 1, 50, 'red')
const ballArray = []
const colorArray = ['#A8C0CE', '#AAB0B5', '#768591', '#DEA800', '#EEEC00']

for (let i = 0; i < 200; i++) {
    const raduis = Math.random() * 4 + 1;
    const x = Math.random() * (canvas.width - raduis * 2) + raduis
    const y = Math.random() * (canvas.height - raduis * 2) + raduis
    const dx = Math.random() + 1;
    const dy = Math.random() + 1;
    const color = colorArray[Math.floor(Math.random() * 4 + 1)]
    ballArray.push(new Ball(x, y, dx, dy, raduis, color))
}

function draw() {
    requestAnimationFrame(draw)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ballArray.forEach(e => e.move())
}
draw()