import { fireEvent, render, screen } from "@testing-library/react"
import { expect } from "@jest/globals"
import "@testing-library/jest-dom"

import GeneratedTable from "../src/components/generated-table"
import SearchTarget from "../src/components/search-target"
import Matrix from "../src/components/matrix"
import React from "react"

describe("Matrix Section - Rendering", () => {
  it("renders the parent component", async () => {
    render(<GeneratedTable data={[]} setData={jest.fn} />)
    const section = await screen.findByTestId("section-matrix")
    expect(section).toBeDefined()
    expect(<Matrix />).toBeDefined()
  })
  it("renders the matrix components", async () => {
    render(
      <Matrix
        sortedData={[]}
        request={{ rows: 4, cols: 4 }}
        onChange={jest.fn}
      />
    )
    const textMatrix = (await screen.findByTestId("title-matrix")).textContent
    expect(textMatrix).toContain("Matrix of")
  })
  it("renders search target component", async () => {
    render(<SearchTarget onSearch={jest.fn} />)
    const textMatrix = await screen.getByLabelText("Search Target")
    expect(textMatrix).toBeDefined()
  })
})

describe("Matrix Section - Functionality", () => {
  it("triggers 'Sort It' button then call a function on the parent", async () => {
    const mockFn = jest.fn()
    render(<GeneratedTable data={[]} setData={mockFn} />)
    const button = screen.getByText("Sort It")
    fireEvent.click(button)
    expect(mockFn).toHaveBeenCalled()
  })
  it("triggers function 'onInputChange'", async () => {
    const mockFn = jest.fn()
    const useStateSpy = jest.spyOn(React, "useState")
    render(
      <Matrix
        sortedData={[]}
        request={{ rows: 4, cols: 4 }}
        onChange={mockFn}
      />
    )
    const firstInput = screen.getAllByTestId("matrix-tile")[0]
    setTimeout(() => {
      fireEvent.change(firstInput, { target: { value: 99 } })
      expect(useStateSpy).toHaveBeenCalled()
      expect(mockFn).toHaveBeenCalled()

      const find99 = screen.getByText("99")
      expect(find99).toBeInTheDocument()

      useStateSpy.mockRestore()
    }, 100)
  })
  it("checks dimension of the matrix (4x4)", () => {
    const useStateSpy = jest.spyOn(React, "useState")
    render(
      <Matrix
        sortedData={[]}
        request={{ rows: 4, cols: 4 }}
        onChange={jest.fn}
      />
    )
    expect(useStateSpy.mock.calls[0][0]).toHaveLength(4) // count rows
    expect(useStateSpy.mock.calls[0][0][0]).toHaveLength(4) // count columns
    useStateSpy.mockRestore()
  })
  it("returns position of the target number", () => {
    const useStateSpy = jest.spyOn(React, "useState")
    const targetNumber = 15
    render(
      <>
        <Matrix
          sortedData={[]}
          request={{ rows: 4, cols: 4 }}
          onChange={jest.fn}
        />
        <SearchTarget onSearch={jest.fn} />
      </>
    )
    setTimeout(() => {
      const input = screen.getByTestId("target_number")
      fireEvent.change(input, { target: { value: targetNumber } })

      expect("Position:").toBeInTheDocument()
    }, 100)

    useStateSpy.mockRestore()
  })
})
