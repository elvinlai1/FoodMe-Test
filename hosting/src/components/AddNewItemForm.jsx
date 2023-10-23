import React, { useContext, useEffect, useState } from 'react';
import { AuthUserContext } from '../firebase/AuthUserContext';
import { addUserFoodItems } from '../firebase/firestore';


const date = new Date();
const today = date.toISOString().slice(0,10);

const DEFAULT_MANUAL_ITEM_FORM = {
    itemName: "Test Item",
    itemType: "Test Type",
    itemQuantity: 0,
    itemPurchaseDate: today,
}

export default function AddNewItemForm () { 

    const { currentUser } = useContext(AuthUserContext);

    const [formFields, setFormFields] = useState(DEFAULT_MANUAL_ITEM_FORM);

    const handleManualAddItem = () => {
        //create a new copy of the FormFields object
        const newItem = { ...formFields };
        //add the new item to the inventory array
        //setInventory([...inventory, newItem]);
        console.log(newItem);
        //reset form fields
        setFormFields(DEFAULT_MANUAL_ITEM_FORM);
        if(currentUser){
            addUserFoodItems(currentUser?.uid , newItem);
        }
    }


    return ( 
        
        <>
        {/* Item Form */}
        <div className="container border border-black justify-around">
            
            <div className="flex flex-wrap p-3 justify-around">

                <div className="container max-w-sm mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                        htmlFor="grid-item-name">
                        Item Name 
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red rounded py-3 px-4 mb-3 leading-tight 
                        focus:outline-none focus:bg-white" 
                        id="grid-item-name" 
                        type="text" 
                        placeholder="ex. Apple" 
                        value={formFields.itemName} 
                        onChange={(event) => setFormFields(prevState => ({...prevState, itemName: event.target.value}))}
                        />
                    <p className="text-red-500 text-xs italic">Please fill out this field</p>
                </div>

                <div className="container max-w-sm mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                        htmlFor="grid-item-name">
                        Item Quantity 
                    </label>
                    <div className="flex flex-row gap-6 justify-between"> 

                        <button className="font-bold text-xl w-14 h-12 rounded bg-gray-300 hover:bg-gray-400"
                            tabIndex={-1}
                            onClick={() => setFormFields(prevState => ({ ...prevState, itemQuantity: Math.max(prevState.itemQuantity - 1, 1)}))}
                            >&minus;</button>

                        <input className="appearance-none block w-1/3 bg-gray-200 text-gray-700 border border-red rounded py-3 px-4 leading-tight 
                            focus:outline-none focus:bg-white" 
                            id="grid-item-name" 
                            type="number" 
                            placeholder="ex. 1" 
                            min="1"
                            max="100"
                            value={formFields.itemQuantity}
                            onChange={(event) => setFormFields(prevState => ({...prevState, itemQuantity: event.target.value}) )}/>

                        <button className="font-bold text-xl w-14 h-12 rounded bg-gray-300 hover:bg-gray-400"
                            tabIndex={-1}
                            onClick={() => setFormFields(prevState => ({ ...prevState, itemQuantity: Math.min(prevState.itemQuantity + 1, 100)}))}
                            >&#43;</button>
                    </div>
                </div>

            </div>

            <div className="flex flex-wrap justify-around p-3">

                <div className="container max-w-sm mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3" 
                        htmlFor="item-type">
                        Item Type
                    </label>
                    <div className="relative">
                        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight 
                            focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="item-type"
                            value={formFields.itemType}
                            onChange={(event)=> setFormFields(prevState => ({...prevState, itemType: event.target.value}))}>
                            <option>Select a Option</option>
                            <option>Fruit</option>
                            <option>Vegetable</option>
                            <option>Meat</option>
                            <option>Seafood</option>
                            <option>Dairy</option>
                            <option>Grain</option>
                            <option>Sauce</option>
                            <option>Spice</option>
                            <option>Oil</option>
                            <option>Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                    <p className="text-red-500 text-xs italic">{formFields.itemType=="Select a Option" ? "Please select an option" : <></>}</p>
                </div>

                <div className="container max-w-sm mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
                        htmlFor="item-purchase-date">
                            Item Purchase Date
                    </label>
                    <input className="block w-full rounded bg-gray-200 border-gray-300 px-3 py-3 
                        focus:bg-white focus:outline-none"
                        type="date"
                        value={formFields.itemPurchaseDate}
                        onChange={(event) => setFormFields(prevState => ({...prevState, itemPurchaseDate: event.target.value}))}/>
                </div>

            </div>
            <div className='flex justify-center'> 
                <button className="rounded bg-gray-800 text-gray-100 px-3 py-3 my-3
                    hover:bg-gray-200 hover:text-gray-800 border border-gray-800" 
                    onClick={handleManualAddItem}>Add Item</button>
            </div>
            
        </div>
        {/* End Item Form */}
        </>
        
    )
}
