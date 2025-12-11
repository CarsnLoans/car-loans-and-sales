import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import BenefitsForYou from "./pages/BenefitsForYou";
import Eligibility from "./pages/Eligibility";
import InterestRates from "./pages/InterestRates";

import ApplyNow from "./pages/ApplyNow";
import EMICalculator from "./pages/EMIcalculator";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="benefits_for_you" element={<BenefitsForYou />} />
            <Route path="eligibility" element={<Eligibility />} />
            <Route path="interestRate" element={<InterestRates />} />
            <Route path="EMI" element={<EMICalculator />} />
            <Route path="applyNow" element={<ApplyNow />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
