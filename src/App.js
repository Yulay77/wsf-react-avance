import "./App.css";
import { useEffect, useState } from "react";
import ButtonView from "./views/ButtonView";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import NotificationView from "./views/NotificationView";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  useEffect(() => {
    console.log("new theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div
      className="App"
      style={{
        backgroundColor: theme === "light" ? "whitesmoke" : "grey",
        color: theme === "light" ? "black" : "white",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout theme={theme} />}>
            <Route path="/" element={<h1>Coucou Home</h1>} />
            <Route
              path="/buttons"
              element={<ButtonView theme={theme} toggleTheme={toggleTheme} />}
            />
            <Route
              path="/notifications"
              element={<NotificationView theme={theme} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
//<Button key={button.title} {...button}/>    <=>   React.createElement(Button, {key: button.title, ...button})

export default App;
