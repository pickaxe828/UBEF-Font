// This code generates PNGs from only white-and-transparent pngs to a full color PNGs

import fs from "fs"

import paper from "paper"
import canvas, { createCanvas } from "canvas"

let originalColors = [
  "#FFFFFF",
  "#999999",
  "#4C4C4C",
  "#191919",
  "#E5E533",
  "#D87F33",
  "#993333",
  "#664C33",
  "#7FCC19",
  "#667F33",
  "#6699D8",
  "#4C7F99",
  "#334CB2",
  "#F27FA5",
  "#B24CD8",
  "#7F3FB2"
]

let colors = [
  "#CCD2D3",
  "#76766C",
  "#2C3034",
  "#010206",
  "#EFA90A",
  "#DF5800",
  "#871515",
  "#583316",
  "#56A40F",
  "#3F5219",
  "#1882C3",
  "#0A6F81",
  "#212388",
  "#D35C88",
  "#A22498",
  "#5C1597"
]


let _ = fs.readdirSync("../") // All are source pngs
  .filter(path => path.endsWith(".png")) // Filter out non png files
  .forEach(path => {
    path = `../${path}`
    
    paper.setup(new paper.Size(20, 40))

    let image = new canvas.Image
    let newCanva = createCanvas(20, 40)
    image.src = fs.readFileSync(path)

    let canva = new canvas.Canvas(image.width, image.height)
    let ctx = canva.getContext('2d')
    ctx.drawImage(image, 0, 0, image.width, image.height)

    // Put image into paper
    let rawRaster = new paper.Raster(canva)
    ;[...Array(16).keys()].forEach(colorDec => {
      let newRaster = new paper.Raster(newCanva)
      ;[...Array(rawRaster.height).keys()].forEach(y => {
        ;[...Array(rawRaster.width).keys()].forEach(x => {
          let resColor = rawRaster.getPixel(x, y).multiply(
            new paper.Color(colors[colorDec])
          )
          newRaster.setPixel(x, y, resColor)
        })
      })
      let newImages = new canvas.Image
      newImages.src = newRaster.toDataURL()
      fs.writeFileSync(`../../${colorDec.toString(16)}${path.slice(4, -4)}.png`, newImages.src.slice(22), "base64")
    })
  })

// Open png in paper js