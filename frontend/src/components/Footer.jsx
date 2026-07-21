import "./Footer.css";
import {
    FileText,
    Bot,
    User
} from "lucide-react";

function Footer(){

    return(

        <footer className="footer">

            <div className="footer-content">

                <div className="footer-column">

                    <h3>IoTSpec AI</h3>

                    <p className="footer-tagline">
                        AI-Powered Requirement Summarizer
                    </p>

                </div>

                <div className="footer-column">

                    <div className="footer-heading">

                        <FileText size={18}/>

                        <span>Features</span>

                    </div>

                    <ul>

                        <li>Functional Requirements</li>

                        <li>Non-Functional Requirements</li>

                        <li>IoT Device Detection</li>

                        <li>Sensor Extraction</li>

                        <li>Risk Analysis</li>

                    </ul>

                </div>

                <div className="footer-column">

                    <div className="footer-heading">

                        <Bot size={18}/>

                        <span>Technology</span>

                    </div>

                    <ul>

                        <li>Groq API</li>

                        <li>Llama 3.3 70B</li>

                        <li>React + Express</li>

                        <li>JavaScript</li>

                    </ul>

                </div>

                <div className="footer-column">

                    <div className="footer-heading">

                        <User size={18}/>

                        <span>Developer</span>

                    </div>

                    <ul>

                        <li>Mahnoor Farrukh</li>

                        <li>BS Computer Science</li>

                        <li>Version 1.0</li>

                    </ul>

                </div>

            </div>

            <div className="footer-bottom">

                © 2026 IoTSpec AI • Built with Groq API & React

            </div>

        </footer>

    );

}

export default Footer;