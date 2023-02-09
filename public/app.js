const socket = io()

window.addEventListener("touchmove",(events) => {
    events = events.changedTouches[0]
   const { clientX, clientY } = events
   const [x , y] = calculateMouseMovement(clientX, clientY)
   socket.emit("mouse_movement",{ x , y})
})

window.addEventListener("click",(events) => {
   const { clientX, clientY } = events
   const [x , y] = calculateMouseMovement(clientX, clientY)
   socket.emit("mouse_click",{ x , y})
})


function calculateMouseMovement(x, y) {
    const x_percentge = 100 * (x / window.innerWidth)
    const y_percentage = 100 * (y / window.innerHeight)

    return [ x_percentge, y_percentage ]
}
function log(x,y) {
    document.body.innerHTML = `X : <strong>${x}% </strong> <br/> Y: <strong>${y}%</strong>` 
}
