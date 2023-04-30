import * as React from "react";

import logoImage from "../media/logo.png";

import SignInGoogleButton from "./login/SignInButton";
import SignInButton from "./login/SignInButton";

export default function SignInSide() {
  return (
    <section
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(129deg, rgba(128, 128, 128, 1) 31%, rgba(192, 192, 192, 1) 70%)",
      }}
    >
      <img src={logoImage} style={{ height: "200px", width: "200px" }}></img>
      <SignInButton />
    </section>
  );
}
