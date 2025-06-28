import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { post } from "@/boot/axios";

// Define validation schema with Zod
const signUpSchema = z.object({
  email: z
    .string()
    .email("Digite um e-mail válido")
    .nonempty("E-mail é obrigatório"),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .nonempty("Senha é obrigatória"),
});

export default function SignUpForm({ setIsSignUp }) {
  const navigate = useNavigate();

  // Initialize useForm with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // auth logic here (e.g., API call)
      const user = await post("/users", data);

      console.log(user);

      // on success
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="my-auto px-8 w-full">
      <h2 className="text-3xl font-bold mb-6 text-center">Cadastre-se</h2>
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

          <p className="mt-1 text-sm text-red-500 h-5">
            {errors?.email?.message}
          </p>
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

          <p className="mt-1 text-sm text-red-500 h-5">
            {errors?.password?.message}
          </p>
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-md font-semibold transition-colors bg-selected hover:bg-background disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Criando..." : "Criar Conta"}
        </button>
      </form>
      <p className="mt-4 text-sm text-center text-secondary">
        Já tem uma conta?{" "}
        <a
          href="#"
          className="underline text-text"
          onClick={() => setIsSignUp(false)}
        >
          Login
        </a>
      </p>
    </div>
  );
}
