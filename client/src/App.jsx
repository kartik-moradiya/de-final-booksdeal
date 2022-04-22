import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/headers/Header";
import MainPages from "./components/mainPages/MainPages";
import Footer from "./components/footer/Footer";
import { DataProvider } from "./globleState";

const App = () => {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <MainPages />
          <Footer />
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;
