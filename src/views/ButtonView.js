import React from "react";
import Button from "../components/Button";

export default function ButtonView({ theme, toggleTheme }) {
  const buttons = [
    {
      theme,
      color: "red",
      component: "a",
      variant: "squared",
      title: "Click Me",
      onClick: () => console.log("Click Me"),
    },
    {
      theme,
      color: "blue",
      variant: "rounded",
      title: "Click Round",
      onClick: () => console.log("Click Round"),
    },
    {
      theme,
      color: "magenta",
      title: "Click Magenta",
      disabled: true,
      className: "foo",
      "data-rel": "issue",
      onClick: () => console.log("Click Magenta"),
    },
    {
      theme,
      variant: "rounded",
      title: "",
      onClick: toggleTheme,
    },
  ];

  return (
    <div>
      {theme}
      <br />
      {buttons.map((button) => (
        <Button key={button.title} {...button} />
      ))}
    </div>
  );
}
