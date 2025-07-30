
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const EmployeeDocumentUpload = () => {
  const [form, setForm] = useState({ title: "", description: "" });
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;
  const token = localStorage.getItem("token");
  const fileInputRef = useRef(null); // ✅ ref to clear file input

  const loadDocuments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/documents", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocuments(res.data);
    } catch {
      alert("Failed to load documents");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/documents", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Uploaded successfully");
      setForm({ title: "", description: "" });
      setFile(null);
      fileInputRef.current.value = ""; // ✅ clear file input
      loadDocuments();
    } catch {
      alert("Upload failed");
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const filteredDocs = documents.filter((doc) =>
    `${doc.title} ${doc.description}`.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDocs.length / perPage);
  const paginatedDocs = filteredDocs.slice((page - 1) * perPage, page * perPage);

  return (
    <div style={styles.page}>
      <div style={styles.headerFixed}>
        <h1 style={styles.header}>Document Upload</h1>
      </div>

      <div style={styles.flexWrap}>
        {/* Upload Section */}
        <div style={styles.uploadCard}>
          <h3 style={styles.cardTitle}>Upload New Document</h3>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              style={styles.input}
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              ref={fileInputRef} // ✅ linked to ref
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Upload</button>
          </form>
        </div>

        {/* Document List */}
        <div style={styles.tableCard}>
          <h3 style={styles.cardTitle}>Uploaded Documents</h3>

          <input
            type="text"
            placeholder="🔍 Search by title or description"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            style={styles.searchInput}
          />

          {paginatedDocs.length === 0 ? (
            <p style={styles.noData}>No matching documents found.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>File</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedDocs.map((doc) => (
                    <tr key={doc.id}>
                      <td>{doc.title}</td>
                      <td>{doc.description}</td>
                      <td>
                        <a
                          href={`http://localhost:5000${doc.fileUrl}`}
                          target="_blank"
                          rel="noreferrer"
                          style={styles.link}
                        >
                          View
                        </a>
                      </td>
                      <td>{doc.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={styles.pagination}>
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  style={styles.pageBtn}
                >
                  ◀
                </button>
                <span style={{ padding: "0 10px" }}>
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  style={styles.pageBtn}
                >
                  ▶
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDocumentUpload;

// ------------------
// Inline Styles
// ------------------
const styles = {
  page: {
    fontFamily: "'Segoe UI', sans-serif",
    padding: "100px 40px 40px",
    background: "linear-gradient(to right, #f7fafd, #e3f2fd)",
    minHeight: "100vh",
  },
  headerFixed: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#ffffff",
    padding: "15px 40px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    zIndex: 1000,
    textAlign: "center",
  },
  header: {
    fontSize: "26px",
    fontWeight: "700",
    margin: 0,
    color: "#2c3e50",
  },
  flexWrap: {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
  },
  uploadCard: {
    flex: "1 1 300px",
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  tableCard: {
    flex: "2 1 600px",
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  cardTitle: {
    fontSize: "18px",
    marginBottom: "20px",
    color: "#34495e",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    backgroundColor: "#2e86de",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
  },
  searchInput: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  link: {
    textDecoration: "none",
    color: "#1976d2",
    fontWeight: "bold",
  },
  noData: {
    fontStyle: "italic",
    color: "#888",
    paddingTop: "10px",
  },
  pagination: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  pageBtn: {
    backgroundColor: "#f0f0f0",
    padding: "6px 12px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};


