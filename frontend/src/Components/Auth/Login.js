import { Link, useNavigate } from "react-router-dom";
import { InputFields } from "../InputFields/InputFields";
import socialMedia from "../../assets/social-media.png";
import { useState, useEffect } from "react";
import { Loading } from "../Loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiRequests";

export const Login = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const error = useSelector((state) => state.auth.login?.message);
  const loading = useSelector((state) => state.auth.login?.isFetching);
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("password");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center bg-slate-50 h-screen">
      <img src={socialMedia} alt="brand" className="rounded-full p-2 w-40" />
      <span className="text-3xl mb-4">Sign in to Social Media</span>
      <div className="flex flex-col items-center">
        <form onSubmit={handleLogin}>
          <InputFields
            data={username}
            type="text"
            placeholder="Enter username"
            setData={setUsername}
            label="USERNAME"
            classStyle="w-full h-10 mb-4 border-input"
          />
          <InputFields
            data={password}
            type="password"
            placeholder="Enter password"
            setData={setPassword}
            label="PASSWORD"
            classStyle="w-full h-10 mb-4 border-input"
          />
          {loading ? (
            <button
              type="submit"
              className="text-center w-full bg-green-400 h-10 text-base"
            >
              <Loading
                loadingType="ClipLoader"
                color="white"
                loading={loading}
                size="30px"
              />
            </button>
          ) : (
            <button
              type="submit"
              className="text-center w-full bg-green-400 h-10 text-base"
            >
              {" "}
              Continue{" "}
            </button>
          )}
          {error && <p className="errMsg"> {error} </p>}
        </form>
        <span className="my-4 text-base">Don't have an account yet?</span>
        <Link
          className="my-4 text-blue-400 text-xl underline underline-offset-2 hover:text-blue-600"
          to="/register"
        >
          Register now
        </Link>
      </div>
    </div>
  );
};
