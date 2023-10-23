import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { signInUser } from '../firebase/firebase'

const defaultForm = {
    email: '',
    password: '',
}

function Login() {

    const [formFields, setFormFields] = useState(defaultForm)
    const {email, password} = formFields

    let navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;
        try {
            await signInUser(email.value, password.value);
            navigate('/dashboard');
        } catch (error) {
            alert(error);
        }
    }

    const handleFormChange = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }

    return (
            
            <div className='flex flex-col items-center justify-center h-screen'>
                <h1 className='text-4xl font-bold'>FoodMe</h1>
                <form className='grid gap-3 py-4 w-64' onSubmit={handleSignIn}>
                    <input className='appearance-none rounded py-3 px-3
                        focus:outline-none hover:outline outline-2 '
                        type="text" 
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleFormChange} 
                        required
                        />
                    <input className='appearance-none rounded py-3 px-3 mb-3
                        focus:outline-none hover:outline outline-2'
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        value={password}
                        onChange={handleFormChange}
                        required
                        />
                    <div className="flex place-content-evenly mb-3">
                        <button className='text-xs hover:text-white'>Remember me</button>
                        <button className='text-xs hover:text-white'>Forgot Password</button>
                    </div>
                
                    <button className="rounded py-2 px-2 bg-gray-800 text-white mb-3
                        hover:bg-gray-400 hover:text-gray-800" 
                        type="submit">Submit</button>
                    <Link className='w-full text-center py-2 px-3 hover:text-white' to='/signup'>Sign Up</Link>
                </form>
            </div>
    )
}

export default Login;