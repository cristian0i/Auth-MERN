import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { googleReuqest } from "../api/auth";
import { useDispatch } from "react-redux";
import { requestSuccess } from "../context/userSlice";


function OAuth() {
    const dispatch = useDispatch();
  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const user = {
        name: result.user.displayName,
        email: result.user.email,
        profilePicture: result.user.photoURL
    };
      const res = await googleReuqest(user);
        dispatch(requestSuccess(res.data));
    } catch (error) {
      console.log("Could not login with google", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogle}
      className="bg-red-500 text-white p-3 rounded-lg hover:opacity-95"
    >
      SIGN IN WHIT GOOGLE
    </button>
  );
}

export default OAuth;

// import { useEffect } from 'react';
// import { GoogleAuthProvider, getAuth, getRedirectResult, signInWithRedirect } from "firebase/auth";
// import { app } from "../firebase";
// import { googleReuqest } from "../api/auth";
// import { useDispatch } from "react-redux";
// import { singinSuccess } from "../context/userSlice";

// function OAuth() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const auth = getAuth(app);
//     getRedirectResult(auth)
//       .then((result) => {
//         if (result) {
//           const user = {
//             name: result.user.displayName,
//             email: result.user.email,
//             photo: result.user.photoURL
//           };
//           return googleReuqest(user);
//         }
//       })
//       .then((res) => {
//         if (res) {
//           dispatch(singinSuccess(res.data));
//           // Limpia el hash del URL
//           window.location.hash = '';
//         }
//       })
//       .catch((error) => {
//         console.log("Could not login with google", error);
//       });
//   }, [dispatch]);

//   const handleGoogle = () => {
//     const provider = new GoogleAuthProvider();
//     const auth = getAuth(app);
//     // Agrega un hash al URL antes de la redirección
//     window.location.hash = '/';
//     signInWithRedirect(auth, provider);
//   };

//   return (
//     <button
//       type="button"
//       onClick={handleGoogle}
//       className="bg-red-500 text-white p-3 rounded-lg hover:opacity-95"
//     >
//       SING IN WHIT GOOGLE
//     </button>
//   );
// }

// export default OAuth;