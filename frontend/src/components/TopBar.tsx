import { useNavigate } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";

export default function TopBar() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("user_id");

    navigate("/login");
  }
  return (
    <>
      <div className="fixed w-full h-[50px] top-0 z-10 flex items-center border-b border-border justify-between bg-background p-4 shadow-md">
        <h1>Bem-vindo ao Desafio!</h1>
        <button onClick={handleLogout}>Logout</button>
        <ThemeSwitch />
      </div>
      {/* Height count for overflow */}
      <div className="h-[80px]"></div>
    </>
  );
}
