import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Navigate } from "react-router-dom";
import axios from "axios";
import customToast from "../hooks/customToast.jsx";

export default function ProfilePage() {
  const { ready, user, setUser } = useContext(UserContext);

  const logOutUser = () => {
    axios.post('/logout').then(res => {
      setUser(null)
      customToast("Logged out")
    }).catch((err) => {
      customToast(err.response?.data || "Something went wrong", "error")
    })
  }

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user ) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className="min-h-screen">
      <div>
        <h1 className='text-3xl'>Hello {user.name}</h1>
        <button
          onClick={logOutUser}
          className='w-3/4 mx-auto mt-5 text-lg transition-all duration-500 shadow-lg px-5 py-2 rounded-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l'>
          Logout
        </button>
      </div>
    </div>
  );
}