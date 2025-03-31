import React from "react";
import "./App.css";
import Header from "./components/Header";
import TreeCounter from "./components/TreeCounter";
import DonationForm from "./components/DonationForm";
import Leaderboard from "./components/Leaderboard";
import Articles from "./components/Articles";
import Navbar from "./components/Navbar";
import Footer from "./components/footer"
import Socials from "./components/socials"
import AllArticles from "./components/AllArticles"; // Import the new component
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Navbar />
      <Header />
      <TreeCounter count={"2,48,35,961"} />
      <DonationForm />
      <Leaderboard /> */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Header />
                <TreeCounter  />
                <DonationForm />
                <Leaderboard />
                <Articles />
                <Socials />
                <Footer />
              </>
            }
          />
          <Route path="/all-articles" element={<><AllArticles/></>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
