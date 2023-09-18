import React, { useState } from "react";
import './FormPage.css';
import { useHistory } from "react-router-dom";
import { getInitialItems, postFormData } from "../../apicalls/ApiCalls";
import JWTatom from "../../Recoil/Atoms/JWT";
import ClickData from "../../Recoil/Atoms/ClickData";
import { useSetRecoilState } from "recoil";

const FormPage = () => {
    const [formData, setFormData] = useState({
        age: '',
        sex: '',
        qualifications: '',
        languageProficiency: '',
        vision: '',
        handedness: '',
        country: '',
        city: '',
        ethnicity: '',
        device: '',
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

      async function getInitial(token, res){
        let event = new Date();
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
    
        const val = {
          shapeGrid: res.shapeGrid,
          patterns: res.patterns,
          currentTrial: res.currentTrial,
          fruitCount: res.fruitCount,
          date: today.toDateString(),
          timestamp: event.toString()
        }
        const response = await getInitialItems(token, val).then((resp) =>{
          setClickData((prev) => ({
            ...prev,
            shapeGrid: resp?.shapeGrid,
            patterns: resp?.patterns,
            trialId: resp?.trial_id,
            currentTrial: resp?.currentTrial,
            clickNumber: resp?.click_number
          }))
        })
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit")
        postFormData(formData).then((resp) => {
            setJWT((prev) => ({
                ...prev,
                token: resp?.accessToken,
            }))
            setClickData((prev) => ({
                ...prev,
                currentTrial: resp?.currentTrial,
                fruitCount: resp?.fruitCount,
                patterns: resp?.patterns,
                shapeGrid: resp?.shapeGrid
            }))
            getInitial(resp.accessToken, resp)
        }).then(() => {
            history.push("/game")
        })
      };

    return(
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <div className="item">
                    <label>Age:</label>
                    <input
                    type="number"
                    name="age"
                    value={formData.age}
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
                    <select
                    type="text"
                    name="vision"
                    value={formData.vision}
                    onChange={handleChange}
                    required
                    >
                    <option value="">Select</option>
                    <option value="fixed">Fixed</option>
                    <option value="normal">Normal</option>
                    </select>
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
                    <label>Device:</label>
                    <select
                    name="device"
                    value={formData.device}
                    onChange={handleChange}
                    required
                    >
                    <option value="">Select a Device</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Mobile Phone">Mobile Phone</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Desktop Computer">Desktop Computer</option>
                    </select>
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