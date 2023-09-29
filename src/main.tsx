/** @format */

import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App.tsx"

import "@fontsource-variable/inter"
import "@fontsource-variable/montserrat"
import "@/globals.css"
import "@fontsource-variable/roboto-mono"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
