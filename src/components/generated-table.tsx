
import Matrix from "@/components/matrix"

const GeneratedTable = ({ data, setData }: any) => {
  
  const onSubmit = () => {
    let cloned = [...data]

    // Flatten the 4x4 array into a 1D array
    const flattenedArray = cloned.flat();

    // Compare the numbers
    const compareNumbers = (a: number, b: number) => a - b;

    // Sort the flattened array
    flattenedArray.sort(compareNumbers);

    // Reshape the sorted 1D array back into a 4x4 array
    const sortedArray = [] as any;
    for (let i = 0; i < 4; i++) {
      sortedArray.push(flattenedArray.slice(i * 4, (i + 1) * 4));
    }

    setData(sortedArray)
  }

  return (
    <div className="w-full" data-testid="section-matrix">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <Matrix request={{ rows: 4, cols: 4 }} onChange={setData} sortedData={data} />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={onSubmit}
        >
          Sort It
        </button>
      </div>
    </div>
  )
}

export default GeneratedTable
