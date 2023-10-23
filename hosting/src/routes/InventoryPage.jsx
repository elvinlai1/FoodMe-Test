import React, { useEffect, useState, useContext } from 'react';
import { AuthUserContext } from '../firebase/AuthUserContext';
import AddNewItemForm from '../components/AddNewItemForm';
import Table from '../components/Table';
import {listenForUserFoodItemsUpdates } from '../firebase/firestore';

function Inventory() {

    const {currentUser} = useContext(AuthUserContext);

    const tableProps = {
        name: "Inventory List", 
        header: [
            "Item ID",
            "Name", 
            "Type",
            "Quantity",
            "Purchase Date",
        ],
        fieldOrder: [
            "itemName",
            "itemType",
            "itemQuantity",
            "itemPurchaseDate",
        ]
    }


    const [userFoodItems, setUserFoodItems] = useState([]);

    useEffect(() => {

        // handle any changes to the user's food items data
        let unsubscribe;
        if (currentUser) {
            unsubscribe = listenForUserFoodItemsUpdates(currentUser.uid, (updatedFoodItems) => {
            setUserFoodItems(updatedFoodItems);
          });
        }
    
        // Clean up the listener when the component unmounts
        return () => {
          if (unsubscribe) {
            unsubscribe();
          }
        }
      }, [currentUser]);

    

    return (

        <div className='flex flex-col items-center justify-center my-6 p-6'>
                              
                <AddNewItemForm />

                <Table tableProps={tableProps} tableData={userFoodItems} /> 

        </div>        
    )

}


export default Inventory;