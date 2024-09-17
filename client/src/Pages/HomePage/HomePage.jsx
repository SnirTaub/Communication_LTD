import "./HomePage.css";
import { FcCellPhone, FcCallback, FcWebcam, FcAssistant } from "react-icons/fc";

const HomePage = () => {
    return (
        <>
            <div className="container-wrap col">
                <h1 className="text-body-secondary title">
                    Welcome to Communications Ltd
                </h1>
                <div>
                    <h2 className="title">About Us</h2>
                    <p className="about-us-paragraph">
                        <b>
                        Communications Ltd is a leading provider of communication services
                        for businesses of all sizes
                        <br />
                        Our goal is to help our clients improve
                        their communication capabilities and increase their productivity</b>
                    </p>
                    <h2 className="title">Services</h2>
                    <ul>
                        <li>
                            {" "}
                            <FcCellPhone />
                            VoIP Phone Systems
                        </li>
                        <li>
                            {" "}
                            <FcCallback />
                            Unified Communications
                        </li>
                        <li>
                            {" "}
                            <FcWebcam />
                            Video Conferencing
                        </li>
                        <li>
                            <FcAssistant />
                            Contact Center Solutions
                        </li>
                    </ul>
                    <h2 className="title">Contact Us</h2>
                    <p className="contact-us-paragraph">
                        Want to learn more about our services?
                    </p>
                    <div className="contact-details">
                        
                        Ltd: 123 Main St Anytown, USA
                        <br />
                        Phone: 555-555-5555
                        <br />
                        Email: info@communicationsltd.com
                    </div>
                </div>
                <footer>
                    <p className="footer-paragraph">
                        <br />
                        2024 Communications Ltd. All rights reserved to us :
                    
                        Snir & Ilya & Denis
                    </p>
                </footer>
            </div>
        </>
    );
};

export default HomePage;
