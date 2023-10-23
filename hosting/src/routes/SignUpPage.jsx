import React, {useState} from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { createUser } from '../firebase/firebase'


const defaultForm = {
    email: '',
    password: '',
    confirmPassword: ''
}


function SignUp() {
    const [formFields, setFormFields] = useState(defaultForm)
    const {email, password, confirmPassword} = formFields

    const [message, setMessage] = useState('')
    const [error, setError] = useState(null)

    const handleFormChange = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }

    const handleSignUp = (event) => {
        event.preventDefault()
        setMessage('')
        setError(null)

        if (password == confirmPassword) {
            createUser(email, password, errorMessage => {
                if (errorMessage == null) {
                    return navigate('/dashboard')
                }
            });
        }else{
            setError('Passwords do not match')
        }
    }

    return (

        <>
            <div className='flex flex-col items-center justify-center h-screen'>
                <p>{message}</p>
                <h1 className='text-4xl font-bold my-2'>Sign Up</h1>
                <form className='grid gap-3 mb-6 w-64' onSubmit={handleSignUp}>
                    <input className='appearance-none rounded py-3 px-3 mb-3'
                        type="text" 
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleFormChange} 
                        required
                        />
                    <input className='appearance-none rounded py-3 px-3'
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        value={password}
                        onChange={handleFormChange}
                        required
                        />
                    <input className='appearance-none rounded py-3 px-3 mb-3'
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={handleFormChange}
                        required
                        />
                    <button className='rounded py-2 px-2 bg-gray-800 text-white mb-3' 
                        type="submit">Submit</button>
                </form>
                <p>{error}</p>
                <Link className="hover:text-white" to='/login'>Return to Login</Link>
            </div>
        </>
    )

}

export default SignUp;