import { useNavigate } from "react-router-dom";
import dccImage from "/dcc.jpg"; // Adjust path as needed
import dccImageDark from "/dcc_dark.png"; // Adjust path as needed
import { useTheme } from "next-themes";

export default function Login() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  function handleLogin() {
    // auth logic

    // on success
    navigate("/");
  }
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="flex w-full min-h-screen shadow-lg rounded-lg  bg-card">
        <div className="w-1/3 min-h-full flex border-r border-border">
          <div className="my-auto px-8 w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
            <form>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2 text-secondary"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 border-border bg-background text-text"
                  placeholder="Preencha o seu e-mail"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-sm font-medium mb-2 text-secondary"
                  htmlFor="password"
                >
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 border-border bg-background text-text"
                  placeholder="Preencha a sua senha"
                />
              </div>
              <button
                type="button"
                className="w-full py-3 rounded-md font-semibold transition-colors bg-selected hover:bg-background"
                onClick={handleLogin}
              >
                Entrar
              </button>
            </form>
            <p className="mt-4 text-sm text-center text-secondary">
              Não tem uma conta?{" "}
              <a href="#" className="underline text-text">
                Cadastre-se
              </a>
            </p>
          </div>
        </div>
        {/* Right Side - Image */}
        <div
          className="w-2/3 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              theme === "dark" ? dccImageDark : dccImage
            })`,
          }}
        ></div>
      </div>
    </div>
  );
}
