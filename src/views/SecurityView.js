import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function SecurityView() {
  const { user, login, register,  logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const State = useLocation();
  const pathname = State?.state?.to || "/";

  useEffect(() => {
      // eslint-disable-next-line eqeqeq 
    if (user != false) return navigate("/");
    }, [user,navigate]);

    if (user !== false) return <></>;

  function handleLogin(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login(data.get("email"), data.get("password"))
      .then(() => {
        navigate(pathname);
      })
      .catch((e) => console.error("login failed", e.message));
  }

  function handleRegister(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    register(data.get("email"), data.get("password"))
      .then(() => {
        navigate(pathname);
      })
      .catch((e) => console.error("register failed", e.message));
  }

  return (
    <div>
      SecurityView
      <form onSubmit={handleLogin}>
        <input name="email" type="email" autoComplete="username"/>
        <input name="password" type="password" autoComplete="current-password" />
        <input type="submit" value="Login" />
      </form>
      <form onSubmit={handleRegister}>
        <input name="email" type="email" autoComplete="username" />
        <input name="password" type="password" autoComplete="current-password"/>
        <input type="submit" value="Register" />
      </form>
      <br/>
      <input type="button" value="logout" onClick={() => logout()}/>
    </div>
  );
}
