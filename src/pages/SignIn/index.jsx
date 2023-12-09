import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { AuthContext } from "../../providers";

import { HttpService } from "../../services";

export function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setIsLogin } = useContext(AuthContext);

  // useEffect(() => {
  //   HttpService.post("/user/register", {
  //     username: "admin",
  //     password: "123456",
  //   }).then((res) => {
  //     alert("OK!");
  //   });
  // }, []);

  const onSubmitClick = () => {
    HttpService.post("/user/login", { username, password }).then((res) => {
      const { status, token } = res.data;
      if (status === 200) {
        setIsLogin(true);
        localStorage.setItem("token", token);
      }
    });
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="max-w-screen-md shadow-md p-4 space-y-4">
        <h1 className="text-4xl mb-8 text-center">Sign In</h1>
        <TextField
          id="username-field"
          label="Email or Username"
          margin="dense"
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />
        <TextField
          id="password-field"
          label="Password"
          type="password"
          margin="dense"
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <div className="flex justify-end">
          <Button color="primary" variant="contained" onClick={onSubmitClick}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
