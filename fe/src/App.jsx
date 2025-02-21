import React, { useState } from "react";
import "./App.css";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [getResponseData, setGetResponseData] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(""); // State for filter selection

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const res = await fetch("http://localhost:5000/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: parsedData.data }),
      });
      const data = await res.json();
      console.log("API Response:", data);

      setResponseData(data);
    } catch (error) {
      console.error("Invalid JSON");
    }
  };

  const handleGetRequest = async () => {
    try {
      const res = await fetch("http://localhost:5000/bfhl", { method: "GET" });
      const data = await res.json();
      setGetResponseData(data);
    } catch (error) {
      console.error("Error fetching GET response");
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">{`2237205 - Karan Aggarwal`}</h1>
      <div className="input-container">
        <input
          className="input-box"
          type="text"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Enter JSON"
        />
        <button className="submit-btn" onClick={handleSubmit}>
          Submit POST Request
        </button>
      </div>

      {responseData && (
        <div className="table-container animate">
          <h2>POST Response</h2>
          <table className="response-table">
            <tbody>
              <tr>
                <td>
                  <strong>Success:</strong>
                </td>
                <td>{responseData.is_success ? "True" : "False"}</td>
              </tr>
              <tr>
                <td>
                  <strong>User ID:</strong>
                </td>
                <td>{responseData.user_id}</td>
              </tr>
              <tr>
                <td>
                  <strong>Email:</strong>
                </td>
                <td>{responseData.email}</td>
              </tr>
              <tr>
                <td>
                  <strong>Roll Number:</strong>
                </td>
                <td>{responseData.roll_number}</td>
              </tr>
              <tr>
                <td>
                  <strong>Filter By:</strong>
                </td>
                <td>
                  <select onChange={(e) => setSelectedFilter(e.target.value)}>
                    <option value="">Select</option>
                    <option value="numbers">Numbers</option>
                    <option value="alphabets">Alphabets</option>
                    <option value="highest_alphabet">Highest Alphabet</option>
                  </select>
                </td>
              </tr>
              {selectedFilter === "numbers" && (
                <tr>
                  <td>
                    <strong>Numbers:</strong>
                  </td>
                  <td>
                    {Array.from(new Set(responseData.numbers.map(Number))).join(
                      ", "
                    )}
                  </td>
                </tr>
              )}
              {selectedFilter === "alphabets" && (
                <tr>
                  <td>
                    <strong>Alphabets:</strong>
                  </td>
                  <td>{[...new Set(responseData.alphabets)].join(", ")}</td>
                </tr>
              )}
              {selectedFilter === "highest_alphabet" && (
                <tr>
                  <td>
                    <strong>Highest Lowercase Alphabet:</strong>
                  </td>
                  <td>{responseData.highest_alphabet}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <button className="get-btn" onClick={handleGetRequest}>
        Click for GET Endpoint
      </button>

      {getResponseData && (
        <div className="get-response animate">
          <h2>GET Response</h2>
          <p>Operation Code: {getResponseData.operation_code}</p>
        </div>
      )}
    </div>
  );
}

export default App;
