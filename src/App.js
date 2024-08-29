// 導入各個頁面
import React from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import styles from "./styles/style.css";

// Route Set
/**導入routes節點切換器以及route設定節點
 * 把節點放進去裡面
 * 新版本不會有route需要輸入exact的問題產生
 *
 * 另外就是要跟Nav後面的 href配合
 * 導入React當中的link to去實作
 */
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
