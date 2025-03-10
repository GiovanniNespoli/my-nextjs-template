import LoginForm from "./components/loginForm";

export default function Login() {
  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <div className="w-1/3 h-3/4 bg-zinc-100 border-1  border-zinc-300 rounded-[8px] shadow-xl flex justify-center items-center animate-fadeInUp">
        <LoginForm />
      </div>
    </div>
  );
}
