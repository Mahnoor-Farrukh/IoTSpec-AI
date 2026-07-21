import "./ResultPanel.css";
import { jsPDF } from "jspdf";

import {
  LayoutDashboard,
  FileText,
  CheckCircle2,
  Shield,
  Cpu,
  Radio,
  TriangleAlert,
  Lightbulb,
  Download,
} from "lucide-react";

function ResultPanel({ analysis }) {

  if (!analysis) {
  return (
    <div className="result-panel">

      <div className="panel-title">

        <LayoutDashboard size={20} />

        <h2>Requirement Summary</h2>

      </div>

      <div className="empty-dashboard">

        <LayoutDashboard size={60} />

        <h3>No Summary Yet</h3>

        <p>
          Enter an IoT or Smart Home requirement and click
          <strong> Summarize Requirements</strong>.
        </p>

      </div>

    </div>
  );
}

if (analysis?.error) {
  return (

    <div className="result-panel">

      <div className="panel-title">

        <LayoutDashboard size={20} />

        <h2>Requirement Summary</h2>

      </div>

      <div className="empty-dashboard">

        <TriangleAlert
          size={60}
          color="#ef4444"
        />

        <h3>Invalid Requirement</h3>

        <p>{analysis.error}</p>

      </div>

    </div>

  );
}

  const requirementCount =
    (analysis.functionalRequirements?.length || 0) +
    (analysis.nonFunctionalRequirements?.length || 0);

  const deviceCount = analysis.iotDevices?.length || 0;
  const sensorCount = analysis.sensors?.length || 0;
  const riskCount = analysis.risks?.length || 0;

  // ===========================
  // PDF DOWNLOAD FUNCTION
  // ===========================

  const downloadPDF = () => {

    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    let y = 20;

    const checkPage = () => {

      if (y > pageHeight - 25) {
        doc.addPage();
        y = 20;
      }

    };

    const addSection = (title, items) => {

      checkPage();

      doc.setFontSize(15);
      doc.text(title, 20, y);

      y += 8;

      doc.setFontSize(11);

      if (!items || items.length === 0) {

        doc.text("No information available.", 25, y);

        y += 8;

        return;

      }

      items.forEach((item) => {

        checkPage();

        const lines = doc.splitTextToSize("• " + item, 165);

        doc.text(lines, 25, y);

        y += lines.length * 6;

      });

      y += 8;

    };

    // Report Heading

    doc.setFontSize(22);
    doc.text("IoTSpec AI", pageWidth / 2, y, {
      align: "center",
    });

    y += 10;

    doc.setFontSize(13);

    doc.text(
      "AI-Powered IoT Requirement Analysis Report",
      pageWidth / 2,
      y,
      {
        align: "center",
      }
    );

    y += 12;

    doc.setFontSize(10);

    doc.text(
      "Generated: " + new Date().toLocaleString(),
      20,
      y
    );

    y += 15;

    addSection("Executive Summary", [
      analysis.summary,
    ]);

    addSection(
      "Functional Requirements",
      analysis.functionalRequirements
    );

    addSection(
      "Non Functional Requirements",
      analysis.nonFunctionalRequirements
    );

    addSection(
      "IoT Devices",
      analysis.iotDevices
    );

    addSection(
      "Sensors",
      analysis.sensors
    );

    addSection(
      "Missing Requirements",
      analysis.missingRequirements
    );

    addSection(
      "Risks",
      analysis.risks
    );

    addSection(
      "Suggestions",
      analysis.suggestions
    );

    const totalPages = doc.getNumberOfPages();

    for (let i = 1; i <= totalPages; i++) {

      doc.setPage(i);

      doc.setFontSize(9);

      doc.text(
        `IoTSpec AI • Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        {
          align: "center",
        }
      );

    }

    doc.save("IoTSpec_AI_Report.pdf");

  };
    const Card = ({ title, icon, items }) => (

    <div className="dashboard-card">

      <div className="dashboard-header">

        <div className="dashboard-icon">

          {icon}

        </div>

        <h3>{title}</h3>

      </div>

      <div className="dashboard-body">

        {Array.isArray(items) && items.length > 0 ? (

          items.map((item, index) => (

            <div
              key={index}
              className="dashboard-item"
            >

              <CheckCircle2 size={15} />

              <span>{item}</span>

            </div>

          ))

        ) : (

          <span className="placeholder">

            No information available.

          </span>

        )}

      </div>

    </div>

  );

  return (

    <div className="result-panel">

      <div className="result-header">

        <div className="panel-title">

          <LayoutDashboard size={20} />

          <h2>Analysis Results</h2>

        </div>

        <button
          className="download-btn"
          onClick={downloadPDF}
        >

          <Download size={17} />

          Download Report

        </button>

      </div>

      <div className="stats-grid">

        <div className="stat-box">

          <span>Total Requirements</span>

          <strong>{requirementCount}</strong>

        </div>

        <div className="stat-box">

          <span>IoT Devices</span>

          <strong>{deviceCount}</strong>

        </div>

        <div className="stat-box">

          <span>Sensors</span>

          <strong>{sensorCount}</strong>

        </div>

        <div className="stat-box">

          <span>Risks</span>

          <strong>{riskCount}</strong>

        </div>

      </div>

      <div className="dashboard-grid">

        <div className="summary-card">

          <div className="dashboard-header">

            <div className="dashboard-icon">

              <FileText size={18} />

            </div>

            <h3>Executive Summary</h3>

          </div>

          <p className="summary-text">

            {analysis.summary || "No summary available."}

          </p>

        </div>
                <Card
          title="Functional Requirements"
          icon={<CheckCircle2 size={18} />}
          items={analysis.functionalRequirements}
        />

        <Card
          title="Non Functional Requirements"
          icon={<Shield size={18} />}
          items={analysis.nonFunctionalRequirements}
        />

        <Card
          title="IoT Devices"
          icon={<Cpu size={18} />}
          items={analysis.iotDevices}
        />

        <Card
          title="Sensors"
          icon={<Radio size={18} />}
          items={analysis.sensors}
        />

        <Card
          title="Missing Requirements"
          icon={<TriangleAlert size={18} />}
          items={analysis.missingRequirements}
        />

        <Card
          title="Risks"
          icon={<TriangleAlert size={18} />}
          items={analysis.risks}
        />

        <Card
          title="Suggestions"
          icon={<Lightbulb size={18} />}
          items={analysis.suggestions}
        />

      </div>

    </div>

  );

}

export default ResultPanel;