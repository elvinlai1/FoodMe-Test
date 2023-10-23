import React from 'react'
import List from '../components/List'
import MonthlyExpenditure from '../components/MonthlyExpenditure';
import InventoryOverview from '../components/InventoryOverview';


function Dashboard(){

        const expiringArray = {
            name: 'Expiring Soon',
            item: {
                name: "Apple",
                quantity: "5",
            }
        }

        const lowInventoryArray = {
            name: 'Running Low',
            item: {
                name: "Apple",
                quantity: "2",
            }
        }
    
        return (
            <>
            <div className='flex flex-col items-center my-6 p-6 gap-6'>

                <MonthlyExpenditure />

                <InventoryOverview />
                
                <div className='container'>
                    
                    <div className='grid grid-cols-4 gap-6'>

                        <div className='col-span-2 border border-black p-3'>
                            <List arrayProp = {expiringArray}  />
                        </div>

                        <div className='col-span-2 border border-black p-3'>
                            <List arrayProp = {lowInventoryArray} />
                        </div>

                    </div>


                </div>

                  
            </div>
            </>
        )
    
}

export default Dashboard;