import React from "react";
import styles from "./App.module.css";
import Button from "./Button";

function App() {
  return (
    <div className={styles.App}>
      <h1 className={styles.HelloWorld}>Hello World</h1>
      <Button className={styles.HelloWorld}>Hello World</Button>
    </div>
  );
}

export default App;
