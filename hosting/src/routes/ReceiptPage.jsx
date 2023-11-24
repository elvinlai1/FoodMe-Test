import React, { useContext, useState } from 'react';
import { AuthUserContext } from '../firebase/AuthUserContext';
import { addReceipt } from '../firebase/firestore';
import { uploadImage } from '../firebase/storage';


export default function Receipts(){

    const { currentUser } = useContext(AuthUserContext);
    const [file, setFile] = useState(null);
    const [ isReceiptUploadDialogOpen, setReceiptUploadDialogOpen ] = useState(false);
    const [ errorDialogMessage, setErrorDialogMessage ] = useState("");
    const [ isErrorDialogOpen, setErrorDialogOpen ] = useState(false);

    const handleReceiptUpload = async (event) => {
        event.preventDefault();

        // load user id and date
        const uid = currentUser?.uid; 
        const date = new Date().toString();
        console.log(file);

        try{
            if(file && uid) {
                const url = await uploadImage(file, uid);    
                addReceipt(uid, date, url);
                console.log("Uploaded");
                setReceiptUploadDialogOpen(false);
            }else{
                // To-do: handle error better
                setErrorDialogMessage("No file selected");
                setErrorDialogOpen(true);
                setReceiptUploadDialogOpen(true);
                console.log("No file selected");
            }

        }catch (error){
            // To-do: handle error better
            setErrorDialogMessage(JSON.stringify(error.message));
            setErrorDialogOpen(true);
            setReceiptUploadDialogOpen(true);   
            console.log(error);
        }

    }

    const handleFileChange = (event) => {
        event.preventDefault();

        if(!event.target.files) {
            setFile(null);
            return;
        }
        setFile(event.target.files[0]);
        console.log(event.target.files[0].name || null);
       
    }



    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1>Reciept</h1>

            <form method="dialog" onSubmit={handleReceiptUpload}>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        <button type="submit">Upload</button>
                    </form>
                    <button onClick={()=> 
                            {
                                setReceiptUploadDialogOpen(false);
                                setFile(null);
                                }}>Cancel</button>
        </div>
    )
}
