import React, { useContext } from 'react'
import {Link, Outlet} from 'react-router-dom'
import { AuthUserContext } from '../firebase/AuthUserContext'

function Layout(){
    const {signOut} = useContext(AuthUserContext)

    return (
        <>
            <nav className='grid grid-flow-col auto-cols-auto py-2 bg-gray-100 font-bold 
                outline outline-2 outline-stone-300'> 
                
                <ul className='profile flex flex-row justify-items-center place-content-evenly '>
                    <li className='rounded p-3 hover:text-white '>
                        <Link className='py-3'to='/dashboard'>Dashboard</Link>
                    </li>
                    <li className='rounded p-3 hover:text-white  '>
                        <Link className="py-3" to='/inventory'>Inventory</Link>
                    </li>
                    <li className='rounded p-3 hover:text-white '>
                        <Link className="py-3" to='/recipes'>Recipes</Link>
                    </li>
                    <li className='rounded p-3 hover:text-white '>
                        <Link className="py-3" to='/reciept'>Reciept</Link>
                    </li>
                    <li className="">
                        <button className='rounded p-3 bg-gray-800 text-white
                        hover:bg-gray-400' onClick={signOut}>Sign Out</button> 
                    </li> 
                </ul>
            </nav>
            
            <Outlet/>
        </>
    )
}

export default Layout;


