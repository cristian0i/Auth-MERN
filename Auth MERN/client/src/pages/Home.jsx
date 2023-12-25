import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSuccess } from "../context/userSlice";

function Home() {
  const { updated } = useSelector((state) => state.user);
  const Dispatch = useDispatch();

  useEffect(() => {
    if (updated) {
      const timer = setTimeout(() => {
        Dispatch(updateSuccess());
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [updated]);

  return (
    <main className="flex flex-col justify-center items-center min-h-[480px] p-4 text-center">
      {updated && (
        <div className="flex items-center mb-10 justify-center">
          <p className="p-3 bg-green-500 text-white rounded-lg">
            Updated successfully
          </p>
        </div>
      )}
      <div className="sm:max-w-2xl">
        <h1 className="text-4xl font-semibold text-gray-800">
          Welcome to <span className="text-blue-500">AUTH APP</span>
        </h1>
        <p className="text-lg text-gray-700 mt-6">
          This is a web application built with the MERN stack (MongoDB,
          Express.js, React.js, Node.js). We offer a seamless user experience
          with sign-in and sign-up functionalities, including the option to
          register through Google. Once you have registered, you will be able to
          edit your profile and personal data. We hope you enjoy your time here!
        </p>
      </div>
    </main>
  );
}

export default Home;
