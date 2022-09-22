import React, { useState, useEffect }  from "react";
import UpdateSkill from "./UpdateSkill";

const SkillList = () => {
    const [resultData, setData] = useState([]);
    const [nameValue, setNameValue] = useState("");
    const [levelValue, setLevelValue] = useState(0);
    const [passNameValue, setPassNameValue] = useState("");
    const [passLevelValue, setPassLevelValue] = useState(0);
    const [skillIdValue, setSkillIdValue] = useState(0);
    const [showEditForm, setShowEditForm] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        const result = await fetch('http://localhost:3001/get-all-skill-list');
        const jsonResult = await result.json();
        setData(jsonResult)
      }
  
      fetchData();
    }, [resultData]);
  
    const addSkill = async (skillName, maxSkillLevel) => {
      const skillDetailsBody = {
        'skillName':skillName,
        'maxSkillLevel':maxSkillLevel
      }
      
      const result = await fetch('http://localhost:3001/add-new-skill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(skillDetailsBody)
      });
  
      const jsonResponse = await result.json();
      console.log(JSON.stringify(jsonResponse));
      setData(prev => [...prev, jsonResponse])
    }

    const deleteSkill = async (skillId) => {
      const result = await fetch(`http://localhost:3001/delete-skill-by-id/${skillId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const jsonResponse = await result.json();
      console.log(JSON.stringify(jsonResponse));
      setData(prev => [...prev, jsonResponse])
    }

    const HandleEditButtonClick = (skillId, skillName, maxSkillLevel) => {
      setShowEditForm(!showEditForm);

      setSkillIdValue(skillId);
      setPassNameValue(skillName);
      setPassLevelValue(maxSkillLevel)
    }
  
    const HandleNameChange = (event) => {
      setNameValue(event.target.value);
    };
  
    const HandleLevelChange = (event) => {
      setLevelValue(event.target.value);
    };
  
    const ButtonAddSkill = () => {
      addSkill(nameValue, levelValue);
    };
    return (
        <React.Fragment>
            <h3>Armor Skill list</h3>
            <form>
              <div>
                  <h4>Add a new skill to the list</h4>
                  <label htmlFor="name-input">Enter Skill Name:</label>
                  <input type="text" placeholder="Enter Skill Name" value={nameValue} id="name-input" onChange={HandleNameChange} />
              </div>
              <div>
                  <label htmlFor="level-input">Skill's Max Level:</label>
                  <input type="number" value={levelValue} id="level-input" onChange={HandleLevelChange} />
              </div>
              <button type="button" onClick={ButtonAddSkill}>Add skill</button>
            </form>
            <table>
              <thead>
                  <tr>
                    <th>Skill Name</th>
                    <th>Skill Max Level</th>
                  </tr>
              </thead>
              <tbody>
                  {resultData.map(skill => 
                  <tr key={skill.id}>
                      <td>{skill.skill_name}</td>
                      <td>{skill.max_skill_level}</td>
                      <td><button type="button" onClick={() => HandleEditButtonClick(skill.id, skill.skill_name, skill.max_skill_level)}>Edit skill</button></td>
                      <td><button type="button" onClick={() => deleteSkill(skill.id)}>Delete skill</button></td>
                  </tr>
                  )}
              </tbody>
            </table>
            {showEditForm && <UpdateSkill skillId={skillIdValue} skillName={passNameValue} skillLevel={passLevelValue} />}
        </React.Fragment>
    )
}


export default SkillList;