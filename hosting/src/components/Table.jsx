

export default function Table({tableProps, tableData}) {
    //specificy the tableProps.fieldOrder to determine the order of the fields in the table

    return (

        <div className='container my-6 p-3 border border-black'>
            <h1 className="uppercase mb-3 font-bold">{tableProps.name}</h1>
            <table className="w-full text-left text-sm text-gray-700">

                <thead className='uppercase text-xs tracking-wide bg-gray-300'>
                    <tr className=''>
                        {tableProps.header.map((header, index) => (
                                <th key={index} className='px-3 py-3'>{header}</th>
                        ))}
                    </tr>
                </thead>

                <tbody className='text-sm'>                        
                    {tableData.map((item) => (
                        <tr key={item.id} className="border-b border-gray-400">
                            <td>{item.id}</td>
                            {tableProps.fieldOrder.map((fieldName) => (
                                    <td key={fieldName} className="p-3"> {item.data[fieldName]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )

}
