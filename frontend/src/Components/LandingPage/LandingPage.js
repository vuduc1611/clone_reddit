import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
  };
  const handleSignUp = () => {
    navigate("/register");
  };
  return (
    <div className="flex bg-gray-200 h-screen items-center justify-center gap-12">
      <div className="flex flex-col l-10">
        <span className="text-red-600 font-bold text-5xl mb-10 pr-24">
          Social Media
        </span>
        <span className="text-black-300 font-normal text-xl font-sans">
          Mạng xã hội trực tuyến miễn phí
        </span>
        <span className="text-black-300 font-normal text-xl font-sans">
          Nơi chia sẻ kết nối đến mọi người
        </span>
      </div>
      <div className="flex flex-col w-1/6">
        <button className="btn-signin" onClick={handleSignIn}>
          Sign In
        </button>
        <button className="btn-signup" onClick={handleSignUp}>
          Sign up
        </button>
      </div>
    </div>
  );
};
