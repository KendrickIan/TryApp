import React, { useState } from "react";
// import Image from "../png-clipart-lightning-mcqueen-lightning-mcqueen-cars-tongue-pixar-the-walt-disney-company-lightning-mcqueen-child-car.png";

const UpdateSkill = (props) => {
    
    const [nameValue, setNameValue] = useState("");
    const [levelValue, setLevelValue] = useState([]);
    
    const updateSkill = async (skillName, maxSkillLevel) => {
        const skillDetailsBody = {
          'skillName':skillName,
          'maxSkillLevel':maxSkillLevel
        }
        
        const result = await fetch(`http://localhost:3001/update-skill-by-id/${props.skillId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(skillDetailsBody)
        });
    
        const jsonResponse = await result.json();
        console.log(JSON.stringify(jsonResponse));
    }

    const HandleEditNameChange = (event) => {
        setNameValue(event.target.value);
      };
    
      const HandleEditLevelChange = (event) => {
        setLevelValue(event.target.value);
      };

    const ButtonUpdateSkill = () => {
        updateSkill(nameValue, levelValue);
    }

    return (
        <React.Fragment>
            {/* <marquee scrollamount="50" >
                <img src={Image}/>
            </marquee> */}
            <form>
                <div>
                    <h4>Add a new skill to the list</h4>
                    <label htmlFor="name-edit-input">Enter Skill Name:</label>
                    <input type="text" placeholder={props.skillName} id="name-edit-input" onChange={HandleEditNameChange} />
                </div>
                <div>
                    <label htmlFor="level-edit-input">Skill's Max Level:</label>
                    <input type="number" placeholder={props.skillLevel} id="level-edit-input" onChange={HandleEditLevelChange} />
                </div>
                <button type="button" onClick={ButtonUpdateSkill}>Update skill</button>
            </form>

        </React.Fragment>
    )
}

export default UpdateSkill;