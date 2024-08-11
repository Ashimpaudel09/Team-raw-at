import React, { useState } from 'react';
import '../css/form.css'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

export default function AcademicForm() {
    const authToken = localStorage.getItem('user_token');
    const navigate = useNavigate();
    const [educationLevel, setEducationLevel] = useState('');
    const [educationField, setEducationField] = useState('');
    const [institutionName, setInstitutionName] = useState('');
    const [graduationYear, setGraduationYear] = useState('');
    const [pphoto, setPphoto] = useState('');
    const [skills, setSkills] = useState([]);
    const [currentSkill, setCurrentSkill] = useState('');
    const [interest, setInterest] = useState('');
    const [projectLinks, setProjectLinks] = useState([]);
    const [socialLinks, setSocialLinks] = useState([]);
    const [currentProjectLink, setCurrentProjectLink] = useState('');
    const [currentSocialLink, setCurrentSocialLink] = useState('');
    const [projectMates, setProjectMates] = useState([]);
    const [error, setError] = useState('');
    const host = "http://localhost:5000";

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                setPphoto(event.target.result);
                const imagePreview = document.getElementById('at-image-preview');
                imagePreview.style.backgroundImage = `url(${event.target.result})`;
                imagePreview.style.visibility = 'visible';
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProjectLinkAdd = () => {
        if (currentProjectLink) {
            setProjectLinks([...projectLinks, currentProjectLink]);
            setCurrentProjectLink('');
        }
    };

    const handleSocialLinkAdd = () => {
        if (currentSocialLink) {
            setSocialLinks([...socialLinks, currentSocialLink]);
            setCurrentSocialLink('');
        }
    };

    const handleSkillAdd = () => {
        if (currentSkill) {
            setSkills([...skills, currentSkill]);
            setCurrentSkill('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!educationLevel || !educationField || !institutionName || !graduationYear || skills.length === 0 || projectLinks.length === 0 || socialLinks.length === 0) {
            setError('All fields are required');
            return;
        }

        const body = {
            education: {
                level: educationLevel,
                field: educationField,
                institution: institutionName,
                graduationYear: parseInt(graduationYear, 10)
            },
            pphoto,
            skills,
            interest,
            projectLinks,
            socialLinks,
            projectMates
        };

        const url = `${host}/api/userdetails`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            navigate('/'); // Redirect on success
        } catch (error) {
            console.log(error);
            setError('Failed to submit details. Please try again.');
        }
    };

    return (
        <div className="at-form-container">
            <h1 className="at-form-container__header">Academic Tinder</h1>
            <h2 className="at-form-container__subheader">Academic Information and Skills Form</h2>

            <div className="at-image-upload">
                <p className="at-image-upload__label">Upload Profile Picture:</p>
                <input type="file" id="at-image-upload__input" accept="image/*" className="at-text-input" onChange={handleImageChange} />
                <div id="at-image-preview" className="at-image-upload__preview"></div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="at-section at-edu">
                    <p className="at-section-title">Education Background</p>
                    <label className="at-label">Highest level of education:</label>
                    <select className="at-select" value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)}>
                        <option value="">Select</option>
                        <option value="SLC">SLC</option>
                        <option value="+2">+2</option>
                        <option value="High school Diploma">High school Diploma</option>
                        <option value="Bachelor Degree">Bachelor Degree</option>
                        <option value="Master's Degree">Master's Degree</option>
                    </select>

                    <label className="at-label">Education Field:</label>
                    <input type="text" className="at-text-input" value={educationField} onChange={(e) => setEducationField(e.target.value)} />

                    <label className="at-label">Institution Name:</label>
                    <input type="text" className="at-text-input" value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} />

                    <label className="at-label">Year of Graduation:</label>
                    <input type="number" className="at-text-input" value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)} />
                </div>

                <div className="at-section at-skill">
                    <p className="at-section-title">Skills</p>
                    <label className="at-label">Add Skill:</label>
                    <input 
                        type="text" 
                        className="at-text-input" 
                        value={currentSkill} 
                        onChange={(e) => setCurrentSkill(e.target.value)} 
                        placeholder="Enter a skill"
                    />
                    <button type="button" className="at-add-skill-button" onClick={handleSkillAdd}>Add Skill</button>
                    <ul>
                        {skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </div>

                <div className="at-section at-purpose">
                    <p className="at-section-title">Purpose of visit</p>
                    <label className="at-label">Why are you visiting this page</label>
                    <select className="at-select" value={interest} onChange={(e) => setInterest(e.target.value)}>
                        <option value="">Select</option>
                        <option value="To explore education resources">To explore education resources</option>
                        <option value="To connect with professionals">To connect with professionals</option>
                        <option value="To look for study buddy">To look for study buddy</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="at-section at-links">
                    <p className="at-section-title">Links</p>

                    <div>
                        <label className="at-label">Project Links:</label>
                        <input 
                            type="url" 
                            className="at-text-input" 
                            value={currentProjectLink} 
                            onChange={(e) => setCurrentProjectLink(e.target.value)} 
                            placeholder="https://example.com"
                        />
                        <button type="button" className="at-add-link-button" onClick={handleProjectLinkAdd}>Add Project Link</button>
                        <ul>
                            {projectLinks.map((link, index) => (
                                <li key={index}><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <label className="at-label">Social Media Links:</label>
                        <input 
                            type="url" 
                            className="at-text-input" 
                            value={currentSocialLink} 
                            onChange={(e) => setCurrentSocialLink(e.target.value)} 
                            placeholder="https://example.com"
                        />
                        <button type="button" className="at-add-link-button" onClick={handleSocialLinkAdd}>Add Social Media Link</button>
                        <ul>
                            {socialLinks.map((link, index) => (
                                <li key={index}><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>

                <button type="submit" id="at-submit" className="at-submit">Submit</button>
            </form>

            {error && <div className="at-error-message">{error}</div>}
        </div>
    );
}
