import React from "react"
import ReactDOM from "react-dom/client"
import { MantineProvider } from "@mantine/core"
import { RouterProvider } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { router } from "./router.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        fontFamily: "Poppins, sans-serif",
        globalStyles: (theme) => ({
          body: {
            backgroundColor: theme.white,
          },
        }),
        colors: {
          brand: [
            "#eef0fb",
            "#d9ddf1",
            "#b1b8e4",
            "#8590d9",
            "#616fd0",
            "#4b5acb",
            "#3f4fc9",
            "#3241b2",
            "#2b3aa0",
            "#21318d",
          ],
        },
        primaryColor: "brand",
      }}
      withNormalizeCSS
      withGlobalStyles
    >
      <RouterProvider router={router} />
      <ToastContainer />
    </MantineProvider>
  </React.StrictMode>
)
