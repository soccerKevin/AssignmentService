import { letterGrades } from 'sa/src/constants/index.js'

export const toLetter = (decimal) => letterGrades[Math.round(decimal)]
