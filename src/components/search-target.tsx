import { useState } from "react"

const SearchTarget = ({ onSearch }: any) => {
  const [targetNum, setTargetNum] = useState()
  const [location, setLocation] = useState(null)

  return (
    <div className="w-full" data-testid="search_target-section">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="search_target"
          >
            Search Target
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="search_target"
            type="number"
            value={targetNum}
            onChange={(e: any) => setTargetNum(e.target.value)}
            placeholder="Number"
          />
        </div>
        {location !== null && (
          <div className="mb-4">
            <p className="text-black">
              <strong>Position:</strong>{" "}
              {location ? location.join(", ") : "false"}
            </p>
          </div>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => onSearch(targetNum, setLocation)}
        >
          Find it
        </button>
      </div>
    </div>
  )
}

export default SearchTarget
