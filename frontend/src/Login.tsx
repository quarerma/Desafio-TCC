import { useState } from "react";
import { useTheme } from "next-themes";
import dccImage from "/dcc.jpg";
import dccImageDark from "/dcc_dark.png";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function Login() {
  const { theme } = useTheme();
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background overflow-hidden">
      <div className="relative h-screen flex overflow-hidden transition-transform duration-700 ease-in-out w-full">
        <div
          className={`h-full flex items-center justify-center  bg-card border-r border-border relative z-10 transition-all duration-700 ${
            isSignUp ? "-translate-x-full w-0 overflow-x-hidden" : "w-1/3 "
          }`}
        >
          <LoginForm setIsSignUp={setIsSignUp} />

          {!isSignUp && (
            <button
              onClick={() => setIsSignUp(true)}
              className="absolute top-1/2 right-[-16px] -translate-y-1/2 z-20 bg-background border border-border rounded-full p-2 shadow hover:bg-accent transition"
            >
              <ArrowRight />
            </button>
          )}
        </div>

        <div
          className={`w-2/3 h-full  transition-all duration-700 ease-in-out `}
          style={{
            backgroundImage: `url(${
              theme === "dark" ? dccImageDark : dccImage
            })`,
          }}
        ></div>

        <div
          className={` h-full flex items-center justify-center bg-card border-l border-border relative z-10 transition-all duration-700 ${
            isSignUp ? "w-1/3" : "translate-x-full w-0"
          }`}
        >
          <SignUpForm setIsSignUp={setIsSignUp} />

          {isSignUp && (
            <button
              onClick={() => setIsSignUp(false)}
              className="absolute top-1/2 left-[-16px] -translate-y-1/2 z-20 bg-background border border-border rounded-full p-2 shadow hover:bg-accent transition"
            >
              <ArrowLeft />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
