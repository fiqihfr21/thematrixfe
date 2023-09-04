"use client"
import { useEffect, useState } from "react"

const generateMatrix = (rows: number, cols: number) => {
  const matrix = []
  for (let i = 0; i < rows; i++) {
    const row = []
    for (let j = 0; j < cols; j++) {
      const min = 1
      const max = 99
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
      row.push(randomNumber)
    }
    matrix.push(row)
  }
  return matrix
}
function Matrix({ request, sortedData, onChange }: any) {
  const { rows, cols } = request || { rows: 4, cols: 4 }
  const matrix = generateMatrix(rows, cols)
  const [data, setData] = useState(matrix)

  const onInputChange = (e: any, rI: number, cI: number) => {
    const cloned = [...data]
    if (e.target.value * 1) {
      cloned[rI][cI] = +e.target.value
      setData(cloned)
      onChange(cloned)
    }
  }

  useEffect(() => {
    onChange(data)
  }, [])

  useEffect(() => {
    if (sortedData.length) {
      setData(sortedData)
    }
  }, [sortedData])

  if ((!rows && !cols) || rows <= 0 || cols <= 0) {
    return <p>Please provide a valid number.</p>
  }

  return (
    <div>
      <h1 className="text-black font-bold" data-testid="title-matrix">
        Matrix of {rows}x{cols}
      </h1>
      <table data-testid="matrix-tiles">
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  <input
                    placeholder="number"
                    width={30}
                    style={{ color: "black" }}
                    value={row[cellIndex]}
                    data-testid="matrix-tile"
                    onChange={(e) => onInputChange(e, rowIndex, cellIndex)}
                    disabled={true}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Matrix
