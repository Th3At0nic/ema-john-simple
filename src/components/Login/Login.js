import { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { userContext } from "../../App";
import {
  createUserWithEmailAndPassword,
  handleFbSignIn,
  handleGoogleSignIn,
  handleSignOut,
  initializeLoginFramework,
  signInWithEmailAndPassword,
} from "../LoginManager";

initializeLoginFramework();
function Login() {
  const [newUser, setNewUser] = useState(0);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    error: "",
    success: false,
  });

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    });
  };

  const signOut = () => {
    handleSignOut().then((res) => {
      setUser(res);
      setLoggedInUser(res);
    });
  };
  const fbSignIn = () => {
    handleFbSignIn().then((res) => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    });
  };

  ///////////// function to act when writing on form
  const handleBlur = (event) => {
    let isFieldValid = true;

    console.log(event.target.name, event.target.value);
    if (event.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
      console.log(isFieldValid);
    }
    if (event.target.name === "password") {
      isFieldValid =
        event.target.value.length > 6 &&
        /[a-z]/i.test(event.target.value) &&
        /[0-9]/.test(event.target.value);
      console.log(isFieldValid);
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };
  ///////////// Submitting form to google.
  const handleOnSubmit = (event) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          setUser(res);
          setLoggedInUser(res);
          history.replace(from);
        }
      );
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      });
    }
    event.preventDefault();
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user.isSignedIn ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={googleSignIn}>Sign in</button>
      )}
      <br />
      <button onClick={fbSignIn}>Sign in with facebook</button>
      {user.isSignedIn && (
        <div>
          <p>Welcome {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
      <br />
      <h1>Our Own Authentication</h1>
      <br />
      <input
        type="checkbox"
        onClick={() => setNewUser(!newUser)}
        name="newUser"
      />
      <label htmlFor="newUser">New user sign up</label>

      <form onSubmit={handleOnSubmit}>
        {newUser && (
          <input
            type="text"
            name="name"
            onBlur={handleBlur}
            placeHolder="Your name."
          />
        )}
        <br />
        <input
          type="text"
          onBlur={handleBlur}
          name="email"
          placeholder="your email"
          required
        />
        <br />
        <input
          type="password"
          onBlur={handleBlur}
          name="password"
          placeholder="your password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign up" : "Sign In"} />
      </form>
      <br />
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "Created" : "Logged In"} successfully.
        </p>
      )}
    </div>
  );
}

export default Login;
