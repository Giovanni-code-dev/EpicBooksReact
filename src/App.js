
import "./App.css";
import "./componentsCss/AllTheBooks.css";
import MyNav from "./components/MyNav";
import MyFooter from "./components/MyFooter"
import Welcome from "./components/Welcome"
import AllTheBooks from "./components/AllTheBooks"

function App() {
  return (
    <div>
      <MyNav />
      <Welcome />
      <AllTheBooks />
      <MyFooter />

    </div>
  );
}

export default App;
