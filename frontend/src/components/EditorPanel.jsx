import { useState } from "react";
import "./EditorPanel.css";
import {
  FileText,
  Sparkles,
  Loader2,
} from "lucide-react";

function EditorPanel({
  requirement,
  setRequirement,
  setAnalysis,
}) {

  const [loading, setLoading] = useState(false);

  const generateReport = async () => {

    if (!requirement.trim()) {
      alert("Please enter a requirement first.");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requirement,
        }),
      });

      const data = await response.json();

      if (!response.ok) {

        setLoading(false);

        alert(data.error || "Failed to generate summary.");

        return;
      }

      console.log("AI Response:", data);

      const cleaned = data.result
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      console.log("Cleaned JSON:", cleaned);

      const parsed = JSON.parse(cleaned);

      console.log("========== PARSED ==========");
      console.log(parsed);
      console.log("============================");

      // Handle non-IoT / invalid input
      if (parsed.error) {

        setLoading(false);

        setAnalysis(null);

        alert(parsed.error);

        return;

      }

      setAnalysis(parsed);

      setLoading(false);

    } catch (error) {

      setLoading(false);

      console.error("Frontend Error:", error);

      alert(error.message);

    }

  };

  return (

    <div className="editor-panel">

      <div className="panel-title">

        <FileText size={20} />

        <h2>Requirement Editor</h2>

      </div>

      <label className="input-label">
        Requirement Description
      </label>

      <textarea
        value={requirement}
        onChange={(e) => setRequirement(e.target.value)}
        placeholder={`Example:

The smart home shall automatically switch on hallway lights after sunset whenever motion is detected.

Paste your IoT requirement here to generate a structured summary...`}
      />

      <div className="buttons">

        <button
          className="analyze-btn"
          onClick={generateReport}
          disabled={loading}
        >

          {loading ? (
            <>
              <Loader2
                size={16}
                className="spinner"
              />

              Summarizing Requirements...

            </>
          ) : (
            <>
              <Sparkles size={16} />

              Summarize Requirements
            </>
          )}

        </button>

        <button
          className="clear-btn"
          disabled={loading}
          onClick={() => {
            setRequirement("");
            setAnalysis(null);
          }}
        >
          Clear
        </button>

      </div>

      <div className="tips-box">

        <h3>Requirement Writing Tips</h3>

        <ul>

          <li>Describe your smart home clearly.</li>

          <li>Mention IoT devices (lights, locks, cameras).</li>

          <li>Mention sensors (motion, smoke, temperature).</li>

          <li>Include security or automation requirements.</li>

          <li>Specify remote access if needed.</li>

        </ul>

      </div>

    </div>

  );

}

export default EditorPanel;