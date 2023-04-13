import React from "react";
import ReactDOM from "react-dom";

import { ConfigProvider } from "antd";
import "./App.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#005da2", //tailwind interactive branding colour
          colorPrimaryBg: "#f1f5f9",
          fontFamily:
            "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif",
          borderRadius: 6,
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          boxShadowSecondary:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
