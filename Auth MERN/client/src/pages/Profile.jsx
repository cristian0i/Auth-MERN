import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { app } from "../firebase";
import { deleteReuqest, logoutReuqest, updateReuqest } from "../api/auth";
import DeleteErrors from "../components/DeleteErrors";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  loadingStar,
  requestSuccess,
  requestFailure,
  logoutSuccess,
  updateSuccess,
} from "../context/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

function Profile() {
  const {
    register,
    handleSubmit,
    setValue,
    unregister,
    watch,
    formState: { errors: updateErrors },
  } = useForm();
  const valuesRegister = watch(["profilePicture", "password"]);
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.user);
  const Dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, SetImage] = useState(undefined);
  const [imagePercent, SetImagePercent] = useState(0);
  const [imageError, SetImageError] = useState(false);
  

  useEffect(() => {
    if (image) handleFileUpload(image);
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        SetImagePercent(Math.round(progress));
      },
      () => {
        SetImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setValue("profilePicture", downloadURL);
        });
      }
    );
  };

  const handleImage = () => {
    fileRef.current.click();
    SetImageError(false);
    SetImagePercent(0);
  };

  const onSubmit = handleSubmit(async (data) => {
    if (valuesRegister[1] == "") unregister("password");
    try {
      Dispatch(loadingStar());
      const response = await updateReuqest(user.id, data);
      Dispatch(requestSuccess(response.data));
      Dispatch(updateSuccess());
      navigate("/");
    } catch (error) {
      Dispatch(requestFailure(error.response.data));
    }
  });

  const handlelogout = async () => {
    try {
      await logoutReuqest();
      Dispatch(logoutSuccess());
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteReuqest(user.id);
      Dispatch(logoutSuccess());
    } catch (error) {
      Dispatch(requestFailure(error.response.data));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center">Profile</h1>
      <form onSubmit={onSubmit} action="" className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          onChange={(e) => SetImage(e.target.files[0])}
          hidden
          accept="image/*"
        />
        <img
          src={valuesRegister[0] || user.profilePicture}
          onClick={handleImage}
          alt="profile"
          className="mt-5 h-24 w-24 rounded-full self-center cursor-pointer object-cover"
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              Error uploadin image, the image most be less than 2MB
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading image: ${imagePercent}%`}</span>
          ) : imagePercent == 100 ? (
            <span className="text-green-600">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <div className="mt-[-16px]">
          <DeleteErrors />
        </div>
        <div className="flex flex-col">
          <input
            defaultValue={user.username}
            type="text"
            id="username"
            placeholder="Username"
            className="bg-slate-100 rounded-lg p-3 mt-[-16px]"
            {...register("username", { required: true })}
          />
          {updateErrors.username && (
            <p className="text-[10px] mt-1 text-red-500">
              Username is required
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <input
            defaultValue={user.email}
            type="email"
            id="email"
            placeholder="Emial"
            className="bg-slate-100 rounded-lg p-3"
            {...register("email", { required: true })}
          />
          {updateErrors.email && (
            <p className="text-[10px] mt-1 text-red-500">Email is required</p>
          )}
        </div>
        <div className="flex flex-col">
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="bg-slate-100 rounded-lg p-3"
            onChange={(e) => setValue("password", e.target.value)}
          />
          {updateErrors.password && (
            <p className="text-[10px] mt-1 text-red-500">
              Password most be last 6 caracters
            </p>
          )}
        </div>
        <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
          {loading ? "LOADING..." : "UPDATE"}
        </button>
      </form>
      <div className="flex justify-between mt-3">
        <span onClick={handleDelete} className="text-red-700 cursor-pointer">
          Delete Account
        </span>
        <span onClick={handlelogout} className="text-red-700 cursor-pointer">
          Logout
        </span>
      </div>
    </div>
  );
}

export default Profile;
