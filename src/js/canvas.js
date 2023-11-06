import { noise } from '@chriscourses/perlin-noise'
const x = noise(10) // returns value 0-1

import utils, { randomColor, randomIntFromRange } from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#0FC2C0','#0CABA8', '#008F8C', '#015958', '#023535']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
})

// Objects
class Circle {
  constructor(x, y, radius, color, distance) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.distance = distance
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
  }

}

// Implementation
let circles = []
let i = 0;
for ( i = 0; i < 200; i++)
{
  circles.push(new Circle(-10, 0, 30, `hsl(${Math.random() * 255}, 50%, 50%)`, i/100));
}
let time = 0;
// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = `rgba(0, 0, 0, 0.08)`
  c.fillRect(0, 0, canvas.width, canvas.height);

  circles.forEach(circle => {
    circle.y = noise(time + circle.distance + 20) * canvas.height;
    circle.x = noise(time + circle.distance) * canvas.width;
    circle.update();
  })
    time += 0.005;
    i++;
}

animate()

