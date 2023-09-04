import { render, screen, fireEvent } from "@testing-library/react"
import HomePage from "../src/app/page"
import "@testing-library/jest-dom"
import { expect } from "@jest/globals"

describe("Matrix Section", () => {
  it("renders the section", async () => {
    render(<HomePage />)
    const section = await screen.findByTestId("section-matrix")
    expect(section).toBeDefined()
  })
  it("renders the title", async () => {
    render(<HomePage />)
    const textMatrix = (await screen.findByTestId("title-matrix")).textContent
    expect(textMatrix).toContain("Matrix of")
  })
  it("renders matrix tiles wrapper", async () => {
    render(<HomePage />)
    const tiles = await screen.findByTestId("matrix-tiles")
    expect(tiles).toBeDefined()
  })
  it("renders 16 matrix tile", async () => {
    render(<HomePage />)
    const tile = await screen.findAllByTestId("matrix-tile")
    expect(tile).toHaveLength(16)
  })
  it("able to changes the value of the tile", async () => {
    render(<HomePage />)
    const input = (await screen.findAllByTestId("matrix-tile"))[0]
    setTimeout(() => {
      fireEvent.change(input, { target: { value: 99 } })
      expect(+input.value).toEqual(99)
    }, 1)
  })
})

describe("Search Target Section", () => {
  it("renders the section", async () => {
    render(<HomePage />)

    const section = await screen.findByLabelText("Search Target")
    expect(section).toBeDefined()
  })
})
