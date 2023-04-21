import React from "react";
import ReactDOM from "react-dom";

import { ConfigProvider } from "antd";
import "./App.css";
import App from "./App";
import { orgColours } from "./org";

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: orgColours?.interactive ?? "#056eef",
          colorPrimaryBg: "#f5f5f5", // tw neutral 100
          colorTextHeading: "#262626", // tw neutral 800
          colorText: "#262626", // tw neutral 800
          colorTextDescription: "#737373", // tw neutral 500
          colorSuccess: "#10b981", // tw emerald 500
          colorWarning: "#f59e0b", // tw amber 500
          colorError: "#f43f5e", // tw rose 500
          colorInfo: orgColours?.interactive ?? "#056eef",
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
