import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [resultData, setData] = useState("");

useEffect(() => {
  getListOfSkills();
}, []);

const getListOfSkills = async() => {
  const response = await fetch("/api-test");

  setData(response);
}




return (
  <div className="App">
    <h1>Armor Skill list</h1>
    <table>
      <thead>
        <tr>
          <th>Skill Name</th>
          {/* <th>Skill Max Level</th> */}
        </tr>
      </thead>
      <tbody>
      
        {resultData.map((obj) => {
          return (
            <tr>
              <td>{obj.skill_name}</td>
            </tr>
          )
        })}
        {/* <td>{!resultData.skill_name ? "" : resultData[0].skill_name}</td>
        <td>{!resultData.max_skill_level ? "" : resultData[0].max_skill_level}</td> */}
      

        {/* {
          data.map((value, key) => {
            return (
              <tr key={key}>
                <td>{value.skill_name}</td>
                <td>{value.max_skill_level}</td>
              </tr>
            )
          })
        } */}
      </tbody>
    </table>
  </div>
);





  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <p> {!data ? "Loading..." : data} </p>
  //     </header>
  //   </div>
  // );
}

export default App;
