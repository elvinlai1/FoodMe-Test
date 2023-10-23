


export default function List ( {arrayProp} ) {
    return (


        <div className="container">
            <p className='text-gray-600'>{arrayProp.name}</p>
            <ul className="text-sm py-3">
                <li className="flex flex-row my-3 justify-between">
                        <div className="">
                            {arrayProp.item.name}
                        </div>
                        <div className="order-last">
                            {arrayProp.item.quantity}
                        </div>
                </li>
                <li className="flex flex-row py-2 justify-between">
                        <div className="">
                            {arrayProp.item.name}
                        </div>
                        <div className="order-last">
                            {arrayProp.item.quantity}
                        </div>
                </li>
            </ul>
        </div>
    )
}
