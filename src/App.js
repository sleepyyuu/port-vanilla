import "./App.css";
import styles from "./styles/Home.module.css";
import MainCanvas from "./components/MainCanvas";

function App() {
  return (
    <div className={styles.main}>
      <MainCanvas></MainCanvas>
    </div>
  );
}

export default App;
