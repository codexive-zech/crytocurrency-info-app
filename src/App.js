import { Routes, Route } from "react-router-dom";
import {
  Home,
  Cryptocurrencies,
  CryptoDetails,
  Exchanges,
  News,
} from "./pages";
import { Navbar, Footer } from "./components";
import { Layout } from "antd";
import "./index.css";

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route index element={<Home />} />
              <Route path="exchanges" element={<Exchanges />} />
              <Route path="cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="crypto/:uuid" element={<CryptoDetails />} />
              <Route path="news" element={<News />} />
            </Routes>
          </div>
        </Layout>

        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
