import { useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { assignUser, removeUser } from "../features/cart/user";
import { WidthContext } from "../App";

const Login = () => {
  const { windowWidth } = useContext(WidthContext);
  const [email, emailHandler] = useState("");
  const [password, passwordHandler] = useState("");
  const [wrongCredential, credentialHandler] = useState(false);
  const google = window.google;
  const { currentUser, localtestUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleCallbackResponse = (response) => {
    const userObject = jwt_decode(response.credential);
    dispatch(assignUser(userObject));
    localStorage.setItem("USER_SESSION", JSON.stringify(userObject));
  };
  useEffect(() => {
    credentialHandler(false);
    google.accounts.id.initialize({
      client_id:
        "597328205668-d3n4o170r0l83g60rcjnd0hodkq72v3s.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);
  const hadleSubmitLogout = (e) => {
    e.preventDefault();
    dispatch(removeUser());
    localStorage.removeItem("USER_SESSION");
  };
  const hadleSubmitLoginLocal = (e) => {
    e.preventDefault();
    if (email === localtestUser.email && password === localtestUser.password) {
      dispatch(assignUser(localtestUser));
      localStorage.setItem("USER_SESSION", JSON.stringify(localtestUser));
    } else {
      credentialHandler(true);
    }
  };
  return (
    <>
      <div
        className={
          windowWidth > 989
            ? "ml-[36%] mt-[1.5rem]"
            : windowWidth > 750
            ? "ml-[30%] mt-[1.5rem]"
            : "mt-[1.5rem]"
        }
      >
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            {Object.keys(currentUser).length !== 0 && (
              <div>
                <div className="font-bold text-xl mb-2">
                  Hello, {currentUser.given_name} {currentUser.family_name}
                </div>
                <div className="font-bold text-xl mb-2">Happy Shopping 😊</div>
                <div className="font-bold text-xl mb-2">
                  Click the button to logout.
                </div>
                <form onSubmit={hadleSubmitLogout}>
                  <button
                    type="submit"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Logout
                  </button>
                </form>
              </div>
            )}
            {Object.keys(currentUser).length === 0 && (
              <div>
                <div className="font-bold text-xl mb-2">
                  Sign In to buy products at RahmanEcommerce.
                </div>
                <p className="mb-[0] text-xs italic">Test user:</p>
                <p className="mb-[0] text-xs italic">
                  email:example@gmail.com, password:123qwerty
                </p>
                {wrongCredential && (
                  <p className="mb-[0] text-red-500 text-xs italic">
                    Credential doesn't match.
                  </p>
                )}
                <form onSubmit={hadleSubmitLoginLocal}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Email
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="Email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => emailHandler(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => passwordHandler(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            )}
            <button>
                          <div
              id="signInDiv"
              className={Object.keys(currentUser).length !== 0 && "hidden"}
              style={{ marginTop: 20 }}
            ></div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
