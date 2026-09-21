import { useState } from "react";
import axios from "axios";

function ApiTester() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("http://localhost:3000/");

    const [requestBody, setRequestBody] = useState(`{
    "name": "Rahul Kumar",
    "email": "rahul@gmail.com",
    "rollNo": "CS101",
    "branch": "CSE",
    "year": 2
}`);

  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    setLoading(true);
    setResponse("");
    setStatus("");

    try {
      let data = undefined;

      // Request body is required only for POST and PUT
      if (method === "POST" || method === "PUT") {
        try {
          data = JSON.parse(requestBody);
        } catch (error) {
          setResponse("Invalid JSON in Request Body");
          setLoading(false);
          return;
        }
      }

      const config = {
        method: method,
        url: url,
        data: data,
      };

      const result = await axios(config);

      setStatus(result.status);

      setResponse(JSON.stringify(result.data, null, 4));
    } catch (error) {
      if (error.response) {
        setStatus(error.response.status);

        setResponse(JSON.stringify(error.response.data, null, 4));
      } else {
        setStatus("ERROR");

        setResponse(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>API Testing Dashboard</h1>

      <p style={styles.subtitle}>Test your Express REST API without Postman</p>

      {/* METHOD + URL */}
      <div style={styles.requestRow}>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={styles.method}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter API URL"
          style={styles.url}
        />

        <button onClick={sendRequest} disabled={loading} style={styles.button}>
          {loading ? "Sending..." : "Send Request"}
        </button>
      </div>

      {/* REQUEST BODY */}
      {(method === "POST" || method === "PUT") && (
        <div style={styles.section}>
          <h2>Request Body</h2>

          <textarea
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
            style={styles.textarea}
            spellCheck="false"
          />
        </div>
      )}

      {/* RESPONSE */}
      <div style={styles.section}>
        <div style={styles.responseHeader}>
          <h2>Response</h2>

          {status && (
            <span
              style={{
                ...styles.status,
                backgroundColor:
                  status >= 200 && status < 300 ? "#16a34a" : "#dc2626",
              }}
            >
              Status: {status}
            </span>
          )}
        </div>

        <pre style={styles.response}>
          {response || "Response will appear here..."}
        </pre>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "40px auto",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8fafc",
    minHeight: "80vh",
  },

  subtitle: {
    color: "#64748b",
    marginBottom: "30px",
  },

  requestRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "25px",
  },

  method: {
    width: "120px",
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
  },

  url: {
    flex: 1,
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
  },

  button: {
    padding: "12px 22px",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer",
  },

  section: {
    marginTop: "25px",
  },

  responseHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  textarea: {
    width: "100%",
    minHeight: "220px",
    padding: "15px",
    fontSize: "15px",
    fontFamily: "monospace",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
  },

  response: {
    minHeight: "250px",
    padding: "20px",
    backgroundColor: "#111827",
    color: "#e5e7eb",
    borderRadius: "6px",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
  },

  status: {
    color: "white",
    padding: "8px 14px",
    borderRadius: "20px",
    fontWeight: "bold",
  },
};

export default ApiTester;
