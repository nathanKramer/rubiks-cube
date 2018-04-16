import { GLube } from '../src'
import $ from 'jquery'

const initialise_cube = (glube_div) => {
  let glube = new GLube({
    colorScheme: {
      blue: [0.3, 0.4, 7.0, 1.0],
      green: [0.486, 0.768, 0.447, 1.0],
      orange: [0.964, 0.537, 0.247, 1.0],
      red: [0.839, 0.223, 0.168, 1.0],
      white: [1.0, 0.972, 0.905, 1.0],
      yellow: [0.976, 0.78, 0.223, 1.0],
      gray: [0.6, 0.6, 0.6, 1.0],
      black: [0.0, 0.0, 0.0, 1.0]
    }
  })
  let canvas = glube_div.find('canvas').get(0)

  glube.start(canvas);
  glube_div.bind('contextmenu', e => false)
  glube_div.mousedown(glube.startRotate)

  $(window).mousemove(glube.rotate)
  $(window).mouseup(glube.endRotate)
  glube.reset()
  glube.initControls()

  glube_div.find('.reset-cube').click(() => glube.reset())
  glube_div.find('.scramble-cube').click(() => glube.scramble())
  glube_div.find('.step').click(() => glube.stepForward())
  glube_div.find('.run-alg').click(() => {
    glube.isInitializing = false
    const alg = glube_div.find('.algorithm').val()
    const moves = glube.parseAlgorithm(alg)
    glube.doAlgorithm(moves)
  })
}

$(document).ready(() => {
  $('div.glube').each(function() {
    initialise_cube($(this))
  })
})
