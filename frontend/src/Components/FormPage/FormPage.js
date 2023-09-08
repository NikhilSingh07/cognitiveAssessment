import React, { useState } from "react";
import './FormPage.css';
import { useHistory } from "react-router-dom";
import { postFormData } from "../../apicalls/ApiCalls";
import JWTatom from "../../Recoil/Atoms/JWT";
import ClickData from "../../Recoil/Atoms/ClickData";
import { useSetRecoilState } from "recoil";

const FormPage = () => {
    const [formData, setFormData] = useState({
        dateOfBirth: '',
        sex: '',
        qualifications: '',
        languageProficiency: '',
        vision: '',
        handedness: '',
        country: '',
        city: '',
        ethnicity: '',
        disability: ''
      });
    const setJWT = useSetRecoilState(JWTatom);
    const setClickData = useSetRecoilState(ClickData)
    let history = useHistory();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        postFormData(formData).then((resp) => {
            setJWT((prev) => ({
                ...prev,
                token: resp.accessToken,
            }))
            setClickData((prev) => ({
                ...prev,
                currentTrial: resp.currentTrial,
                fruitCount: resp.fruitCount,
                patterns: resp.patterns,
                shapeGrid: resp.shapeGrid
            }))
        }).then(() => {
            history.push("/game")
        })
      };

    return(
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <div className="item">
                    <label>Date of Birth:</label>
                    <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    />
                </div>
                
                <div className="item">
                    <label>Sex:</label>
                    <select
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    required
                    >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer not to say">Prefer not to say</option>
                    </select>
                </div>
                
                <div className="item">
                    <label>Qualifications:</label>
                    <input
                    type="text"
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    required
                    />
                </div>
                
                <div className="item">
                    <label>Linguistic Proficiency:</label>
                    <select
                    name="languageProficiency"
                    value={formData.languageProficiency}
                    onChange={handleChange}
                    required
                    >
                    <option value="">Select</option>
                    <option value="monolingual">Monolingual</option>
                    <option value="bilingual">Bilingual</option>
                    <option value="multilingual">Multilingual</option>
                    </select>
                </div>
                
                <div className="item">
                    <label>Vision:</label>
                    <input
                    type="text"
                    name="vision"
                    value={formData.vision}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div className="item">
                    <label>Handedness:</label>
                    <select
                    name="handedness"
                    value={formData.handedness}
                    onChange={handleChange}
                    required
                    >
                    <option value="">Select</option>
                    <option value="right">Right</option>
                    <option value="left">Left</option>
                    <option value="ambidextrous">Ambidextrous</option>
                    </select>
                </div>

                <div className="item">
                    <label>Country:</label>
                    <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div className="item">
                    <label>City:</label>
                    <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div className="item">
                    <label>Ethnicity:</label>
                    <input
                    type="text"
                    name="ethnicity"
                    value={formData.ethnicity}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div className="item">
                    <label>Disability:</label>
                    <select
                    name="disability"
                    value={formData.disability}
                    onChange={handleChange}
                    required
                    >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    </select>
                </div>

                <button type="submit" className="submit-button" onClick={() => handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default FormPage;