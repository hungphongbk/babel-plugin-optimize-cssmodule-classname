import React from "react";
import buttonStyles from "./Button.module.css";
function Button({ children }) {
  return (
    <div className={buttonStyles.Button}>
      <span className={buttonStyles.Text}>{children}</span>
    </div>
  );
}
export default Button;
