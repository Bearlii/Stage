const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

/* NO LONGER NECESSARY DUE TO THE FOR (LET) STATEMENT
context.fillStyle = 'white'
context.fillRect(0, 0, canvas.width, canvas.height)
*/
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}

class Boundary {
    static width = 54
    static height = 54
    constructor({position}) {
        this.position = position
        this.width = 54
        this.height = 54
    }

    draw() {
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []
const offset = {
    x: -1755,
    y: -585
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
        boundaries.push(
            new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            })
        )
    })
})

console.log(boundaries);

const image = new Image()
image.src= 'images/tutor_temp_map.png'

const playerImage = new Image()
playerImage.src ='images/playerDown.png'

class Sprite {
    constructor( { position, velocity, image, frames = {max: 1 } }) {
        this.position = position
        this.image = image
        this.frames = frames

        this.image.onload = () => {
        this.width = this.image.width / this.frames.max
        this.height = this.image.height
        console.log(this.width)
        console.log(this.height)
        }   
    }
    draw() {
        context.drawImage(
            this.image, 
            // cropping
            0, 
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            // actual size
            this.image.width / this.frames.max, 
            this.image.height
        )
    }
}

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2,
    },
    image: playerImage,
    frames: {
        max: 4
    }
})

const background = new Sprite({ 
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const keys = {
    w: {
    pressed: false
},
    a: {
    pressed: false
},
    s: {
    pressed: false
},
    d: {
    pressed: false
}
}

const movables = [background, ...boundaries]

function rectangularCollision ({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}
function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach((Boundary) => {
        Boundary.draw()
    })
    player.draw()

    let moving = true
    if (keys.w.pressed && lastKey === 'w') {
        for (let i = 0; i < boundaries.length; i++) {
            const Boundary = boundaries [i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...Boundary, position: {
                        x: Boundary.position.x,
                        y: Boundary.position.y + 3
                    }}
                })
            ) {
                console.log('colliding')
                moving = false
                break
            }
        }

        if (moving)
        movables.forEach(movable => {
            movable.position.y += 2
        })
    } else if (keys.a.pressed && lastKey === 'a') {
        movables.forEach(movable => {
        movable.position.x += 2
    })
    } else if (keys.s.pressed && lastKey === 's') {
        movables.forEach(movable => {
        movable.position.y += -2
    })
    } else if (keys.d.pressed && lastKey === 'd') {
        movables.forEach(movable => {
        movable.position.x += -2
    })    
    }
}
animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
switch (e.key) {
    case 'w':
        keys.w.pressed = true
        lastKey = 'w'
        break
    case 'a':
        keys.a.pressed = true
        lastKey = 'a'
        break       
    case 's':
        keys.s.pressed = true
        lastKey = 's'
        break        
    case 'd':
        keys.d.pressed = true    
        lastKey = 'd'
        break
}
})

window.addEventListener('keyup', (e) => {
switch (e.key) {
    case 'w':
        keys.w.pressed = false
        break
    case 'a':
        keys.a.pressed = false
        break       
    case 's':
        keys.s.pressed = false
        break        
    case 'd':
        keys.d.pressed = false   
        break
}
})