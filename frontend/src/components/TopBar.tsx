import ThemeSwitch from "./ThemeSwitch";

export default function TopBar() {
  return (
    <>
      <div className="fixed w-full h-[50px] top-0 z-10 flex items-center border-b border-border justify-between bg-background p-4 shadow-md">
        <h1>Bem-vindo ao Desafio!</h1>
        <ThemeSwitch />
      </div>
      {/* Height count for overflow */}
      <div className="h-[80px]"></div>
    </>
  );
}
