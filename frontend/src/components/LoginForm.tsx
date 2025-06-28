import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { post } from "@/boot/axios";
import { useState } from "react";

// Define validation schema with Zod
const loginSchema = z.object({
  email: z
    .string()
    .email("Digite um e-mail válido")
    .nonempty("E-mail é obrigatório"),
  password: z.string().nonempty("Senha é obrigatória"),
});

export default function LoginForm({ setIsSignUp }) {
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState(false);
  // Initialize useForm with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      setLoginError(false);
      // auth logic here (e.g., API call)
      console.log("Form data:", data);

      const user = (await post("/users/login", data)).data as any;

      localStorage.setItem("user_id", user.id);
      // on success
      navigate("/");
    } catch (error) {
      // Handle error (e.g., show error message)
      setLoginError(true);
    }
  };

  return (
    <div className="my-auto px-8 w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            {...register("email")}
            className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 border-border bg-background text-text ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="Preencha o seu e-mail"
            disabled={isSubmitting}
          />

          <p className="mt-1 text-sm text-red-500">{errors?.email?.message}</p>
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
            {...register("password")}
            className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 border-border bg-background text-text ${
              errors.password ? "border-red-500" : ""
            }`}
            placeholder="Preencha a sua senha"
            disabled={isSubmitting}
          />

          <p className="mt-1 text-sm h-5 text-red-500">
            {errors?.password?.message}
          </p>
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-md font-semibold transition-colors bg-selected hover:bg-background disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
        <p className="mt-1 text-sm h-5 text-red-500 text-center">
          {loginError ? "Erro ao realizar Login" : ""}
        </p>
      </form>
      <p className="mt-4 text-sm text-center text-secondary">
        Não tem uma conta?{" "}
        <a
          href="#"
          className="underline text-text"
          onClick={() => setIsSignUp(true)}
        >
          Cadastre-se
        </a>
      </p>
    </div>
  );
}
