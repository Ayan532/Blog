import { useState } from 'react';
import {RxAvatar} from 'react-icons/rx'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/userSlice/userSlice';
import { Link } from 'react-router-dom';

const Register = () => {
    const dispatch=useDispatch()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        file:''
      });
    const [avatarPrev,setAvatarPrev]=useState("")

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    const handleChange=(e)=>{
        e.preventDefault()
        const input=document.createElement('input')
        input.setAttribute('type','file')
        input.setAttribute('accept','image/*')
        input.click()

        input.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    // Access the image data as reader.result
                    setAvatarPrev(reader.result)
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        file: file,
                    }));// Update the avatar state here
                };
            }
           
          };
      


    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        const myForm=new FormData()
        console.log(formData)
        myForm.append("name",formData.name)
        myForm.append("email",formData.email)
        myForm.append("password",formData.password)
        myForm.append("file",formData.file)
       dispatch(registerUser(myForm))
    }

  return (
    <div className="w-full h-screen flex justify-center items-center">
        <form encType='multipart/form-data' onSubmit={handleSubmit} className=" w-full md:w-[500px] md:shadow-lg py-5 md:py-10 p-10 md:p-2 rounded-lg ">
        <div className="mt-5 flex flex-col items-center">
                <h1 className="text-2xl xl:text-3xl font-extrabold mb-3">
                    Sign up
                </h1>
               {avatarPrev?<img src={avatarPrev} className='w-20 h-20 rounded-full' alt="" />:<RxAvatar className='text-9xl'/>}
                <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs flex justify-center items-center flex-col gap-4">
                        <input
                         value={formData.name}
                        onChange={handleInputChange}
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="text" placeholder="Name" name="name"/>
                        <input
                             value={formData.email}
                             name="email"
                            onChange={handleInputChange}
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="email" placeholder="Email" />
                        <input
                        name="password"
                             value={formData.password}
                              onChange={handleInputChange}
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                            type="password" placeholder="Password" />
                        <button
                        onClick={handleChange}
                            className="mt-1 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <span className="ml-3">
                                Upload
                            </span>
                        </button>
                       
                        <button
                        type='submit'
                            className="mt-2 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span className="ml-3">
                                Sign Up
                            </span>
                        </button>

                        <div className="mx-auto mt-1 text-sm">
              {" "}
             Have an account?
             <Link to='/login'> <span className="text-cyan-400 cursor-pointer"> Sign In</span></Link>
            </div>
                       
                    </div>
                   

                    <div className="my-4 border-b text-center">
                        <div
                            className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                            Or sign up with e-mail
                        </div>
                    </div>

                    <div className="flex flex-col items-center mt-1">
                        <button
                            className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                            <div className="bg-white p-2 rounded-full">
                                <svg className="w-4" viewBox="0 0 533.5 544.3">
                                    <path
                                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                        fill="#4285f4" />
                                    <path
                                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                        fill="#34a853" />
                                    <path
                                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                        fill="#fbbc04" />
                                    <path
                                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                        fill="#ea4335" />
                                </svg>
                            </div>
                            <span className="ml-4">
                                Sign Up with Google
                            </span>
                        </button>
                    </div>

                   
                </div>
            </div>
        </form>
    </div>
  )
}

export default Register