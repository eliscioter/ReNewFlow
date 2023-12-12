import { useNavigate } from "react-router";
import { useLogin } from "../../services/api/user";
import { SubmitHandler, useForm } from "react-hook-form";
import { IDType, UserType } from "../../types/validation-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "../../validations/schema/user";
import { toast } from "sonner";
import { useAuth } from "../../services/shared/user";

export default function Login() {
  const navigate = useNavigate();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UserType>({ resolver: zodResolver(UserSchema) });

  const { mutateAsync } = useLogin();
  const { setId } = useAuth();

  // TODO: Implement login properly
  const handleLogin: SubmitHandler<UserType> = async (data) => {
    const login: Partial<{ id: IDType }> & UserType = await mutateAsync({
      username: data.username,
      password: data.password,
    });
    if (!login.id) {
      toast.error("Login Failed");
      return;
    }
    setId(login.id);
    toast.success("Login Success");
    navigate("/dashboard");
  };

  return (
    <div className="container-fluid vh-100 bg-primary">
      <div className="h-100 d-flex flex-column justify-content-center align-items-center">
        <div className="col-lg-6 col-md-10 bg-transparent rounded-3 p-5">
          <h1 className="text-center text-white">Admin Login</h1>
          <form className="p-3" onSubmit={handleSubmit(handleLogin)}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="usernameInput"
                placeholder="Username"
                {...register("username")}
              />
              {errors.username && (
                <span className="text-danger">{errors.username.message}</span>
              )}
              <label htmlFor="usernameInput">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
              <label htmlFor="passwordInput">Password</label>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-dark px-5 fs-5 fw-medium"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
