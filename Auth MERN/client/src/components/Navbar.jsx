import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const { user } = useSelector((state) => state.user);

  return (
    <header>
      <div className="bg-slate-300 p-3 px-5 flex flex-row justify-between items-center w-full sm:w-3/4 mx-auto rounded-md font-semibold text-base">
        <Link to={"/"}>
          <h1 className="text-lg">AUTH APP</h1>
        </Link>
        <ul className="flex gap-5">
          <Link to={"/about"}>
            <li className="border px-2 rounded-md border-black">About</li>
          </Link>
          {user ? (
            <Link to={"/profile"}>
              <img src={user.profilePicture} alt="profile" className="h-7 w-7 rounded-full object-cover" />
            </Link>
          ) : (
            <>
              <Link to={"/signup"}>
                <li className="border px-2 rounded-md border-black">SignUp</li>
              </Link>
              <Link to={"/signin"}>
                <li className="border px-2 rounded-md border-black">SignIn</li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;

{
  /* <Link to={"/signup"}>
                <li>SignUp</li>
              </Link>
              <Link to={"/signin"}>
                <li>SignIn</li>
              </Link> */
}
