import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import EditorPanel from "./components/EditorPanel";
import ResultPanel from "./components/ResultPanel";
import Footer from "./components/Footer";

function App() {

  const [requirement, setRequirement] = useState("");
  const [analysis, setAnalysis] = useState(null);

  return (

    <div className="app">

      {/* Header */}
      <Header />

      {/* Main Workspace */}
      <main className="workspace">

        <EditorPanel
          requirement={requirement}
          setRequirement={setRequirement}
          setAnalysis={setAnalysis}
        />

        <ResultPanel
          analysis={analysis}
        />

      </main>

      {/* Footer */}
      <Footer />

    </div>

  );

}

export default App;