import './App.css'
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthUserContext } from './firebase/AuthUserContext';

import Login from './routes/Login';
import SignUp from './routes/SignUpPage';
import Layout from './components/layout';
import Profile from './routes/ProfilePage';
import Dashboard from './routes/DashboardPage';
import Inventory from './routes/InventoryPage';
import Recipes from './routes/RecipePage';
import NotFound from './routes/notFound';



function App() {

  const { currentUser } = useContext(AuthUserContext)
  const navigate = useNavigate();

   useEffect(() => {
    if (currentUser) {
      navigate('/dashboard') // Force to profile page, ignoring anything else
    }
  }, [currentUser])

  

  return (
  <Routes>
    <Route index element={<Public />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/*" element= {currentUser ? <Layout /> : <Login /> }>
      <Route path="dashboard" element={<Dashboard />}/>
      <Route path="profile" element={<Profile />}/>
      <Route path="inventory" element={<Inventory />} /> 
      <Route path="recipes" element={<Recipes />} />
    </Route>

    <Route component={NotFound} /> 
  </Routes>
  )
}

function Public(){
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
       <h1 className='text-4xl font-bold my-6'>FoodMe</h1>
      <div className='flex flex-col text-center w-48 m-6 gap-6'>
        <Link className="rounded py-2 px-2 bg-gray-800 text-white mb-3
                        hover:bg-gray-400 hover:text-gray-800" to='/login'>Login</Link>
        <Link className="rounded py-2 px-2 bg-gray-800 text-white
                        hover:bg-gray-400 hover:text-gray-800" to='/signup'>Sign Up</Link>
      </div>
    </div>
  )
}


export default App;