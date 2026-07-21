import "./Header.css";
import { Waypoints } from "lucide-react";

function Header() {
  return (
    <header className="header">

      <div className="brand">

        <Waypoints className="brand-icon" />

        <div className="brand-text">

          <h1>IoTSpec AI</h1>

          <p>AI-Powered Requirement Summarizer for IoT Systems</p>

        </div>

      </div>

      <div className="status">

        <span>Groq • Llama 3.3</span>

      </div>

    </header>
  );
}

export default Header;