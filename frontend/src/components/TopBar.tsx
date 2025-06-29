import { useNavigate } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";
import { useUserSession } from "@/hooks/session";
import { LogOut } from "lucide-react";

export default function TopBar() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("user_id");

    navigate("/login");
  }
  const { user } = useUserSession();
  return (
    <>
      <div className=" w-full mt-[35px]  mb-[70px] top-0 z-10 flex items-center  justify-between px-10">
        <h1 className="text-3xl font-bold">
          Bem-vindo ao Desafio TCC, {user.name}!
        </h1>
        <div className="flex space-x-4 items-center">
          <ThemeSwitch />
          <button onClick={handleLogout}>
            <LogOut />
          </button>
        </div>
      </div>
    </>
  );
}
