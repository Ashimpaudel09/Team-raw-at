import React from 'react';
import '../css/about.css';

export default function About() {
    return (
        <div id="root">
            <main className="main-content">
                <section className="about-section">
                    <h1 className="about-title">About Academic Tinder</h1>
                    <p className="about-description">Academic Tinder is a platform designed to connect learners, educators, and
                        researchers. Our mission is to create an inclusive academic environment where users can share courses,
                        find study partners, and collaborate on projects. Whether you're looking for a study buddy, a mentor, or
                        just want to explore new academic opportunities, Academic Tinder is here to help.</p>
                </section>

                <section className="founders-section">
                    <h2 className="founders-title">Meet the Founders</h2>
                    <div className="founders-list">
                        <div className="founder founder1">
                            <img src="founder1.jpg" alt="Founder 1" className="founder-image" />
                            <h3 className="founder-name">Aashish Sapkota</h3>
                            <p className="founder-role">Co-Founder</p>
                            <div className="social-media social-media-founder1">
                                <a href="https://www.linkedin.com/in/aashish-sapkota" target="_blank" aria-label="LinkedIn"
                                    className="linkedin">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                <a href="https://twitter.com/aashish_sapkota" target="_blank" aria-label="Twitter"
                                    className="twitter">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="https://www.instagram.com/aashish_sapkota" target="_blank" aria-label="Instagram"
                                    className="instagram">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>

                        <div className="founder founder2">
                            <img src="founder2.jpg" alt="Founder 2" className="founder-image" />
                            <h3 className="founder-name">Ashim Paudel</h3>
                            <p className="founder-role">Co-Founder</p>
                            <div className="social-media social-media-founder2">
                                <a href="https://www.linkedin.com/in/ashim-paudel" target="_blank" aria-label="LinkedIn"
                                    className="linkedin">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                <a href="https://twitter.com/ashim_paudel" target="_blank" aria-label="Twitter" className="twitter">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="https://www.instagram.com/ashim_paudel" target="_blank" aria-label="Instagram"
                                    className="instagram">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>

                        <div className="founder founder3">
                            <img src="founder3.jpg" alt="Founder 3" className="founder-image" />
                            <h3 className="founder-name">Biplov Khanal</h3>
                            <p className="founder-role">Co-Founder</p>
                            <div className="social-media social-media-founder3">
                                <a href="https://www.linkedin.com/in/biplov-khanal" target="_blank" aria-label="LinkedIn"
                                    className="linkedin">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                <a href="https://twitter.com/biplov_khanal" target="_blank" aria-label="Twitter"
                                    className="twitter">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="https://www.instagram.com/biplov_khanal" target="_blank" aria-label="Instagram"
                                    className="instagram">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            
        </div>
    );
}
