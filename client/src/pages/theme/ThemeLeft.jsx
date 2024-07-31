import React, { useState } from "react";
import styles from "./ThemeLeft.module.css";
import blue from "./images/blue.png";
import dark from "./images/Dark.png";
import light from "./images/light.png";


function ThemeLeft({ onThemeChange }) {

    const [selectedTheme, setSelectedTheme] = useState("");

  const handleThemeClick = (theme) => {
    setSelectedTheme(theme);
    if (onThemeChange) {
      onThemeChange(theme);
    }
  };
  return (
    <div className={styles.sidebar}>
      <h3>Customize the theme</h3>
      <div className={styles.gridContainer}>
        <div
          className={`${styles.themeOption} ${
            selectedTheme === "light" ? styles.selected : ""
          }`}
          onClick={() => handleThemeClick("light")}
        >
          <img src={light} alt="Light Theme" />
        </div>
        <div
          className={`${styles.themeOption} ${
            selectedTheme === "dark" ? styles.selected : ""
          }`}
          onClick={() => handleThemeClick("dark")}
        >
          <img src={dark} alt="Dark Theme" />
        </div>
        <div
          className={`${styles.themeOption} ${
            selectedTheme === "blue" ? styles.selected : ""
          }`}
          onClick={() => handleThemeClick("blue")}
        >
          <img src={blue} alt="Tail Blue Theme" />
        </div>
      </div>
    </div>
  )
}

export default ThemeLeft