import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./Form";
import Order from "./Order";

const root = ReactDOM.createRoot(document.getElementById("root"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />}></Route>
          <Route path="order" element={<Order />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

root.render(<App />);
export default App;
