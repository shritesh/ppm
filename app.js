const fileInput = document.querySelector('#file')
const scaleInput = document.querySelector('#scale')

fileInput.addEventListener('input', renderPPM)
scaleInput.addEventListener('input', renderPPM)

function renderPPM () {
  if (fileInput.files.length !== 1) return
  fileInput.files[0].text().then(ppm => {
    const tokens = ppm.replace(/#.*/g, '').split(/\W+/)
    let idx = 0

    const scale = parseInt(scaleInput.value)

    console.assert(tokens[idx] === 'P3')

    const columns = parseInt(tokens[++idx])
    const rows = parseInt(tokens[++idx])

    console.assert(tokens[++idx] === '255')

    const canvas = document.querySelector('canvas')
    canvas.width = columns * scale
    canvas.height = rows * scale

    const ctx = canvas.getContext('2d')

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        const red = parseInt(tokens[++idx])
        const green = parseInt(tokens[++idx])
        const blue = parseInt(tokens[++idx])

        ctx.fillStyle = `rgb(${red},${green},${blue})`
        ctx.fillRect(x * scale, y * scale, scale, scale)
      }
    }
  })
}
