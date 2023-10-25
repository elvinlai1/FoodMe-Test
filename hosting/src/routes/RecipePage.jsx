

import { useState } from 'react';
import Dialog from '../components/Dialog';

function Recipes() {

    const modalData ={
        title: "Add Recipe",
        body: "This is the content",
        actions: [
            {
                text: "Cancel",
                onClick: () => {
                    console.log("Cancel");
                }
            },
            {
                text: "Add",
                onClick: () => {
                    console.log("Add");
                }
            }
        ]
    }

    return (
        
            <div className='flex flex-col items-center justify-center h-screen'>
                <h1>Recipes</h1>

                <Dialog modalData={modalData}/>
                
            </div>

    );
}

export default Recipes;