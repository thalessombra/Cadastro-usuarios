import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Digite um email válido");
      return;
    }

    if (password.trim().length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setError("");
    setMessage(""); 
    navigate("/home");
  }

  function handleForgotPassword(e) {
    e.preventDefault();

    if (!validateEmail(email)) {
      setMessage("Digite seu email para receber a recuperação de senha.");
      return;
    }

    setMessage(
      `Uma mensagem foi enviada para o email ${email} para criar uma nova senha.`
    );
  }
  
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className={styles["login-container"]}>
      
      <div className={styles["login-imageWrapper"]}>
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample"
          className={styles["login-image"]}
        />
      </div>

     
      <div className={styles["login-formWrapper"]}>
        <form className={styles["login-form"]} onSubmit={handleSubmit}>
          <h2 className={styles["login-title"]}>Login</h2>

          {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}
          {message && (
            <p style={{ color: "green", marginBottom: "15px" }}>{message}</p>
          )}

          <div className={styles["login-inputGroup"]}>
            <input
              type="text"
              placeholder="Email address"
              className={styles["login-input"]}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles["login-inputGroup"]}>
            <input
              type="password"
              placeholder="Password"
              className={styles["login-input"]}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles["login-actions"]}>
            <label className={styles["login-checkbox"]}>
              <input type="checkbox" /> Remember me
            </label>
            <a
              href="#"
              className={styles["login-link"]}
              onClick={handleForgotPassword}
            >
              Forgot password?
            </a>
          </div>

          <button type="submit" className={styles["login-button"]}>
            Login
          </button>
          
        </form>
      </div>
    </div>
  );
}
