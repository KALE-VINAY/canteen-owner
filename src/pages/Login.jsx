// // import React from 'react'

// // const Login = () => {


  
// //   return (
// //     <>
// //     <div>
// //     <img className=' h-screen  md:w-screen object-cover ' src='https://media.istockphoto.com/id/1169694902/photo/assorted-indian-non-vegetarian-food-recipe-served-in-a-group-includes-chicken-curry-mutton.webp?a=1&b=1&s=612x612&w=0&k=20&c=u_Txs8ayelMVBzmb142cbiE7UO4vDokq9hXUCUREPEc=' alt='restaurant photo'/>

// //     </div>

    
// //     <form onSubmit={(e) => e.preventDefault()} className=" w-8/12 md:w-3/12 absolute p-6 md:p-12 bg-black my-36 md:my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
// //         <h1 className="font-bold text-3xl py-4 ">
// //           {isSignInForm ? "Sign In" : "Sign Up"}
// //         </h1>

// //        { !isSignInForm && (<input 
// //           ref={name}
// //           type="text" 
// //           placeholder="Full name" 
// //           className=" p-4 my-4 w-full bg-gray-700 rounded-lg"
// //         />)}


// //         <input 
// //         ref={email}
// //           type="text" 
// //           placeholder="Email address" 
// //           className=" p-4 my-4 w-full bg-gray-700 rounded-lg"
// //         />

// //         <input 
// //         ref={password}
// //           type="password" 
// //           placeholder="Password" 
// //           className=" p-4 my-4 w-full bg-gray-700 rounded-lg"
// //         />
        
// //         <p className="text-red-500 font-bold text-lg py-2" >{errorMessage}</p>

// //         <button className=" p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
// //           {isSignInForm ? "Sign In" : "Sign Up"}
// //         </button>
// //         <p className=" py-4 cursor-pointer" onClick={toggleSignInForm}>
// //           {isSignInForm ? "New to Netflix? Sign up now" : "Already a member? Sign in"}
// //         </p>
// //       </form>

// //     </>
// //   )
// // }

// // export default Login



// import React, { useState , useRef } from 'react';  // Combine React and useState imports
// import { useNavigate } from 'react-router-dom';
// import {checkValideData} from "../utils/validate";
// import {createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth";
// import {auth} from "../utils/firebase";
// import {updateProfile } from "firebase/auth";
// import Header from './Header';
// import { useEffect } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { useDispatch } from 'react-redux';
// import { addUser ,removeUser } from '../utils/userSlice';
// import { BG_URL, USER_AVATER } from '../utils/constants';

// const Login = () => {
//   const [isSignInForm, setIsSignInForm] = useState(true);

//   const [errorMessage , setErrorMessage] = useState(null);
//   const [showValidationHints, setShowValidationHints] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const email = useRef(null);
//   const password = useRef(null);
//   const name = useRef(null);  

//   const toggleSignInForm = () => {
//     setIsSignInForm(!isSignInForm);
//     setErrorMessage(null);
//     setShowValidationHints(false);
//   };
  
//   const handleButtonClick = ()=> {

    
//     // console.log(name.current.value);
//     // console.log(email.current.value);
//     // console.log(password.current.value);

//     const message = checkValideData(email.current.value , password.current.value);
    
//     setErrorMessage(message);
 
//     if (message){

//       setShowValidationHints(true);
//       return;
//     } 


//     if(!isSignInForm){

//       createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
//         .then((userCredential) => {
//           // Signed up 
//                     const user = userCredential.user;
          
//           updateProfile(user, {
//             displayName: name.current.value , 
//             photoURL: USER_AVATER,
//           }).then(() => {
//                   const { uid , email , displayName , photoURL } = auth.currentUser;
//             dispatch(addUser({uid:uid , email:email , displayName:displayName ,photoURL:photoURL }));
            
//             // Profile updated!
//             // ...
           

//           }).catch((error) => {
//             // An error occurred
//             // ...
//             setErrorMessage(error.message)
//           });
//         })
//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           setErrorMessage(errorCode +"-"+errorMessage);
//         });

//     }
//     else{
//       signInWithEmailAndPassword(auth, email.current.value, password.current.value)
//         .then((userCredential) => {
//           // Signed in 
//           const user = userCredential.user;
         
//         })
//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           setErrorMessage(errorCode+"-"+errorMessage);
//         });

//     }

//     };

//     useEffect(() => {
//       const unsubscribe = onAuthStateChanged(auth, (user) => {
//         if (user) {
//           const { uid, email, displayName, photoURL } = user;
//           dispatch(addUser({ uid, email, displayName, photoURL }));
//           navigate("/landing-page");
//         } else {
//           dispatch(removeUser());
//           navigate("/");
//         }
//       });
//       return () => unsubscribe();
//     }, [navigate, dispatch]);



  

//   return (
//     <div>
      
//       <div className="absolute">
//         <img className=' h-screen  md:w-screen object-cover '
//           src='http://www.tezu.ernet.in/images/tu3.jpg' alt="bg img"
//         />
//       </div>

//       <form onSubmit={(e) => e.preventDefault()} className=" w-8/12 md:w-3/12 absolute p-6 md:p-12  bg-gradient-to-l from bg-yellow-50 my-36 md:my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-60 border-black">
//         <h1 className="font-bold font-serif text-4xl py-4 text-gray-800 ">
//           {isSignInForm ? "Sign In" : "Sign Up"}
//         </h1>

//         { !isSignInForm && (
//             <input 
//               ref={name}
//               type="text" 
//               placeholder="Full name" 
//               className="p-4 my-4 w-full bg-white text-gray-800 rounded-lg" // Added text color
//             />
//           )}

//           <input 
//             ref={email}
//             type="text" 
//             placeholder="Email address" 
//             className="p-4 my-4 w-full bg-white text-gray-800 rounded-lg" // Added text color
//           />

//           <input 
//             ref={password}
//             type="password" 
//             placeholder="Password" 
//             className="p-4 my-4 w-full bg-white text-gray-800 rounded-lg" // Added text color
//           />

//          {errorMessage && (
//           <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
//         )}

//         {showValidationHints && !isSignInForm && (
//           <div className="text-yellow-600 text-sm py-2">
//             <p>Password must include:</p>
//             <ul className="list-disc pl-5">
//               <li>At least 8 characters long</li>
//               <li>One special character (@, #, $, !, etc.)</li>
//               <li>One uppercase letter</li>
//               <li>One lowercase letter</li>
//               <li>One number</li>
//             </ul>
//             <p className="mt-2">Email should be in format: username@domain.com</p>
//           </div>
//         )}

//         <button className=" p-4 my-6 bg-gray-700 w-full rounded-lg" onClick={handleButtonClick}>
//           {isSignInForm ? "Sign In" : "Sign Up"}
//         </button>
//         <p className=" py-4 cursor-pointer  font-serif text-gray-800 " onClick={toggleSignInForm}>
//           {isSignInForm ? "New to here? Sign up now" : "Already a member? Sign in"}
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {checkValideData} from "../utils/validate";
import {createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase";
import {updateProfile } from "firebase/auth";
// import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser ,removeUser } from '../utils/userSlice';
import { BG_URL, USER_AVATER } from '../utils/constants';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const [errorMessage , setErrorMessage] = useState(null);
  const [showValidationHints, setShowValidationHints] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);  

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
    setShowValidationHints(false);
  };
  
  const handleButtonClick = ()=> {
    const message = checkValideData(email.current.value , password.current.value);
    
    setErrorMessage(message);
 
    if (message){
      setShowValidationHints(true);
      return;
    } 

    if(!isSignInForm){
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          
          updateProfile(user, {
            displayName: name.current.value , 
            photoURL: USER_AVATER,
          }).then(() => {
            const { uid , email , displayName , photoURL } = auth.currentUser;
            dispatch(addUser({uid:uid , email:email , displayName:displayName ,photoURL:photoURL }));
          }).catch((error) => {
            setErrorMessage(error.message)
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode +"-"+errorMessage);
        });
    }
    else{
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode+"-"+errorMessage);
        });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/home");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate, dispatch]);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          className="w-full h-full object-cover" 
          src='http://www.tezu.ernet.in/images/tu3.jpg' 
          alt="bg img"
        />
      </div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md px-4">
        <form 
          onSubmit={(e) => e.preventDefault()} 
          className="
            w-full 
            p-6 
            md:p-8 
            bg-white/60 
            backdrop-blur-sm 
            rounded-xl 
            shadow-lg 
            border 
            border-gray-200
          "
        >
          {/* Form Title */}
          <h1 className="
            text-center 
            font-bold 
            font-serif 
            text-3xl 
            md:text-4xl 
            py-4 
            text-gray-800
          ">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {/* Name Input (Signup Only) */}
          {!isSignInForm && (
            <input 
              ref={name}
              type="text" 
              placeholder="Full name" 
              className="
                w-full 
                p-3 
                md:p-4 
                my-2 
                bg-white 
                text-gray-800 
                rounded-lg 
                border 
                border-gray-300 
                focus:outline-none 
                focus:ring-2 
                focus:ring-gray-500
              "
            />
          )}

          {/* Email Input */}
          <input 
            ref={email}
            type="text" 
            placeholder="Email address" 
            className="
              w-full 
              p-3 
              md:p-4 
              my-2 
              bg-white 
              text-gray-800 
              rounded-lg 
              border 
              border-gray-300 
              focus:outline-none 
              focus:ring-2 
              focus:ring-gray-500
            "
          />

          {/* Password Input */}
          <input 
            ref={password}
            type="password" 
            placeholder="Password" 
            className="
              w-full 
              p-3 
              md:p-4 
              my-2 
              bg-white 
              text-gray-800 
              rounded-lg 
              border 
              border-gray-300 
              focus:outline-none 
              focus:ring-2 
              focus:ring-gray-500
            "
          />

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 font-bold text-sm md:text-lg py-2 text-center">
              {errorMessage}
            </p>
          )}

          {/* Validation Hints */}
          {showValidationHints && !isSignInForm && (
            <div className="text-yellow-700 text-xs md:text-sm py-2">
              <p className="font-semibold mb-1">Password must include:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>At least 8 characters long</li>
                <li>One special character (@, #, $, !, etc.)</li>
                <li>One uppercase letter</li>
                <li>One lowercase letter</li>
                <li>One number</li>
              </ul>
              <p className="mt-2 text-center">Email should be in format: username@domain.com</p>
            </div>
          )}

          {/* Submit Button */}
          <button 
            className="
              w-full 
              p-3 
              md:p-4 
              my-4 
              bg-gray-700 
              text-white 
              rounded-lg 
              hover:bg-gray-800 
              transition-colors 
              duration-300
            " 
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          {/* Toggle Form Type */}
          <p 
            className="
              text-center 
              py-2 
              cursor-pointer 
              font-serif 
              text-gray-700 
              hover:text-gray-900 
              transition-colors 
              duration-300
            " 
            onClick={toggleSignInForm}
          >
            {isSignInForm 
              ? "New to here? Sign up now" 
              : "Already a member? Sign in"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;