import React from 'react'
import styles from './style.module.scss'

const WIDTH = 463
const HEIGHT = 200
const VERTICAL_STEP = (HEIGHT - 10) / 5
const HORIZONTAL_STEP = WIDTH / 6

interface BarChartProps {
  values: Array<number>
}

const BarChart = (props: BarChartProps) => {
  const { values } = props

  const getHorizontalLines = () => {
    const lines = []

    for (let i = 4; i >= 0; i--) {
      lines.push(
        <>
          <text x={0} y={i * VERTICAL_STEP + 20}>
            {Math.abs(i - 4)}
          </text>

          <line
            x1={20}
            y1={i * VERTICAL_STEP + 15}
            x2={WIDTH}
            y2={i * VERTICAL_STEP + 15}
            strokeDasharray={i < 4 ? 5 : 0} //last line is solid, others are dashed
            stroke={'#ECF0F4'}
            strokeWidth={1}
          />
        </>,
      )
    }

    return lines
  }

  const getRectangles = () => {
    const rectangles = []

    for (let i = 0; i < 6; i++) {
      const xStart = HORIZONTAL_STEP * i + 25;
      const yStart = 0 * VERTICAL_STEP + 15
      const yEnd = 4 * VERTICAL_STEP + 15

      const step = (yEnd - yStart) / 4
      const rectHeight = values[i] * step

      rectangles.push(
        <>
          <rect
            x={xStart}
            y={yEnd - rectHeight}
            width={40}
            height={rectHeight}
            fill={i === 5 ? '#98AEEB' : '#e0e0e0'}
          />

          {/*values*/}
          <text x={HORIZONTAL_STEP * i + 37} y={4 * VERTICAL_STEP} className={styles.value}>
            {values[i]}
          </text>

          {/*month values*/}
          <text x={HORIZONTAL_STEP * i + 33} y={4 * VERTICAL_STEP + 37}>
            Jan
          </text>
        </>,
      )
    }

    return rectangles
  }

  return (
    <svg width={WIDTH} height={HEIGHT} className={styles.barChart}>
      {getHorizontalLines()}
      {getRectangles()}
    </svg>
  )
}

BarChart.defaultProps = {
  values: [1, 2, 3, 4, 3, 2],
}

export default BarChart
