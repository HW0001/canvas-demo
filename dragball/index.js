const canvas = document.getElementById('app')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d")

const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
}
window.addEventListener('mousemove', function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});
window.addEventListener("mousemove", (e) => {
    moveTo.x = e.offsetX
    moveTo.y = e.offsetY
})

function Ball(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.theta = Math.random() * Math.PI * 2;
    this.distance = randomNumber(40, 60);
    this.speed = 0.05
    this.dragSpeed = 0.1
    this.lastMouse = {
        x: x,
        y: y
    }
}
Ball.prototype = {
    draw(lastPosition) {
        ctx.beginPath()
        ctx.strokeStyle = this.color
        ctx.lineWidth = this.radius
        ctx.moveTo(lastPosition.x, lastPosition.y)
        ctx.lineTo(this.x, this.y)
        ctx.stroke()
    },
    move() {
        let lastPosition = {
            x: this.x,
            y: this.y
        }
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * this.dragSpeed;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * this.dragSpeed;

        this.x = this.lastMouse.x + Math.cos(this.theta) * this.distance;
        this.y = this.lastMouse.y + Math.sin(this.theta) * this.distance;

        this.theta += this.speed;
        this.draw(lastPosition)
    }
}

function randomNumber(start, end) {
    return Math.floor(Math.random() * (end + 1) + start)
}
const ballArray = []
const colorArray = ['#A8C0CE', '#AAB0B5', '#768591', '#DEA800', '#EEEC00']

for (let i = 0; i < 100; i++) {
    const raduis = 3;
    const x = canvas.width / 2
    const y = canvas.height / 2
    const color = colorArray[randomNumber(0, 4)]
    ballArray.push(new Ball(x, y, raduis, color))
}

function draw() {
    requestAnimationFrame(draw)
    ctx.fillStyle = 'rgba(255,255,255,0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ballArray.forEach(e => e.move())
}
draw()