import React, { useState, useEffect } from "react";
import logo from "../media/logo.png";
import Image from "../media/image.jpg";
import { Link, useHistory } from "react-router-dom";
import { db, auth } from "../firebase";
import { useStateValue } from "../StateProvider";
import ReactLoading from "react-loading";
import "./Login.css";

function Login() {
  //The global state
  const [{ user }, dispatch] = useStateValue();
  //The user input data.

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(true);
  //To disabled and loading when authenticating
  const [loading, setLoading] = useState(false);

  //User personal data
  const [username, setUsername] = useState("");

  //Checking Action
  const [login, setLogin] = useState(true);
  const [error, setError] = useState(false);
  const history = useHistory();

  //Updating user input
  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateUsername = (e) => setEmail(e.target.value);

  const signUp = (e) => {
    e.preventDefault();
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        db.collection("admin").add({
          username: username,
          useremail: auth?.user?.email,
          userId: auth?.user?.uid,
        });
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth?.user?.email === "jokanola2@qa.team") {
          history.push("/admin");
        } else if (auth) {
          history.push("/");
        }
        e.target.vaue = "";
      })

      .catch((error) => {
        setError("invalid email or password");
        setLoading(false);
      });
  };

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
      console.log(authUser);
    });
  }, [user]);

  return (
    <div
      className="login"
      style={{
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Link to="/">
        <div className="login__logo">
          <img src={logo} alt="amazon-logo" className="" />
        </div>
      </Link>
      {login ? (
        <div className="login__container">
          <form action="" className={error ? "shake" : "nonshake"}>
            <h4 style={{ color: "red" }}>{error}</h4>
            <h1> Sign-in</h1>
            <label>Email</label>
            <input
              type="text"
              name=""
              id=""
              onChange={updateEmail}
              placeholder="Email"
              required
            />
            <label>Password</label>
            <input
              type="password"
              name=""
              id=""
              onChange={updatePassword}
              placeholder="Password"
              required
            />
            <button onClick={signIn} disabled={loading}>
              {loading ? (
                <ReactLoading
                  type="bubbles"
                  color="black"
                  height={35}
                  width={35}
                  className="loading"
                />
              ) : (
                "Login"
              )}
            </button>
            <p>
              By continuing, you agree to Smart Shopp Conditions of Use and
              Privacy Notice. If have no account, click the button below{" "}
            </p>
            <div className="create_account">
              <button onClick={() => setLogin(false)}>Create An Account</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="login__container">
          <form action="">
            <h1> Create an account</h1>
            <label>Name</label>
            <input
              onChange={updateUsername}
              type="text"
              name=""
              id=""
              placeholder="Name"
            />
            <label>Email</label>
            <input type="text" name="" id="" onChange={updateEmail} />
            <label>Password</label>
            <input
              type="password"
              name=""
              id=""
              onChange={updatePassword}
              placeholder="Password"
            />
            <label>Confirm Password</label>
            <input
              type="password"
              name=""
              id=""
              placeholder="Confirm Password"
            />
            <button onClick={signUp} disabled={loading}>
              {loading ? (
                <ReactLoading
                  type="bubbles"
                  color="black"
                  height={35}
                  width={35}
                  className="loading"
                />
              ) : (
                "Create An Account"
              )}
            </button>
            <p>
              By continuing, you agree to Smart Shop Conditions of Use and
              Privacy Notice. If already have an account, click the button below{" "}
            </p>
            <div className="create__account">
              <button onClick={() => setLogin(true)}>Login</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
