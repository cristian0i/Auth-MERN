import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteErrors } from "../context/userSlice";

function DeleteErrors() {
  const { errors } = useSelector((state) => state.user);
  const Dispatch = useDispatch();

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        Dispatch(deleteErrors());
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <>
      {errors.map((error, index) => (
        <p
          key={index}
          className="text-white text-center p-3 mb-4 bg-red-400 text-sm rounded-lg font-medium"
        >
          {error}
        </p>
      ))}
    </>
  );
}

export default DeleteErrors;
