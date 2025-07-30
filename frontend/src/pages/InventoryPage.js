// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const InventoryPage = () => {
//   const [items, setItems] = useState([]);
//   const [newItem, setNewItem] = useState({
//     name: "",
//     category: "",
//     quantity: "",
//     status: "Available",
//   });
//   const token = localStorage.getItem("token");

//   const fetchInventory = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/inventory", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setItems(res.data);
//     } catch (err) {
//       console.error("Failed to load inventory", err);
//     }
//   };

//   const handleAddItem = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/inventory", newItem, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNewItem({ name: "", category: "", quantity: "", status: "Available" });
//       fetchInventory();
//     } catch (err) {
//       console.error("Failed to add item", err);
//     }
//   };

//   useEffect(() => {
//     fetchInventory();
//   }, []);

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Inventory & Asset Management</h2>

//       <form onSubmit={handleAddItem} style={{ marginBottom: 20 }}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={newItem.name}
//           onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Category"
//           value={newItem.category}
//           onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
//           required
//         />
//         <input
//           type="number"
//           placeholder="Quantity"
//           value={newItem.quantity}
//           onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
//           required
//         />
//         <select
//           value={newItem.status}
//           onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
//         >
//           <option value="Available">Available</option>
//           <option value="Damaged">Damaged</option>
//         </select>
//         <button type="submit">Add</button>
//       </form>

//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Name</th><th>Category</th><th>Quantity</th><th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map(item => (
//             <tr key={item.id}>
//               <td>{item.name}</td>
//               <td>{item.category}</td>
//               <td>{item.quantity}</td>
//               <td>{item.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default InventoryPage;


import React, { useEffect, useState } from "react";
import axios from "axios";

const InventoryPage = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: "",
    status: "Available",
  });

  const token = localStorage.getItem("token");

  const fetchInventory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/inventory", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data);
    } catch (err) {
      console.error("Failed to load inventory", err);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/inventory", newItem, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewItem({ name: "", category: "", quantity: "", status: "Available" });
      fetchInventory();
    } catch (err) {
      console.error("Failed to add item", err);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1> Inventory Management</h1>
      </div>

      <div style={styles.formContainer}>
        <h2 style={{ textAlign: "center" }}>Add New Item</h2>

        <form onSubmit={handleAddItem} style={styles.form}>
          <input
            type="text"
            placeholder="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Category"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            required
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            required
            style={styles.input}
          />
          <select
            value={newItem.status}
            onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
            style={styles.input}
          >
            <option value="Available">Available</option>
            <option value="Damaged">Damaged</option>
          </select>
          <button type="submit" style={styles.button}>Add Item</button>
        </form>
      </div>

      <div style={styles.tableWrapper}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Inventory Items</h2>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Quantity</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={styles.tr}>
                  <td style={styles.td}>{item.name}</td>
                  <td style={styles.td}>{item.category}</td>
                  <td style={styles.td}>{item.quantity}</td>
                  <td
                    style={{
                      ...styles.td,
                      color: item.status === "Available" ? "#27ae60" : "#e74c3c",
                      fontWeight: "bold",
                    }}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    maxHeight: "100vh",
    overflowY: "auto",
    background: "#f0f4f8",
    padding: "40px 15px",
    boxSizing: "border-box",
    fontFamily: "Segoe UI, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  formContainer: {
    backgroundColor: "#ffffff",
    maxWidth: "400px",
    margin: "0 auto 40px",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
    justifyContent: "center",
    marginTop: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    width: "400px",
    boxSizing: "border-box",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#2980b9",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px",
    transition: "background 0.3s",
  },
  tableWrapper: {
    maxWidth: "1100px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  tableContainer: {
    overflowX: "auto",
    maxHeight: "400px",
    overflowY: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#ecf0f1",
    padding: "12px",
    borderBottom: "2px solid #ddd",
    textAlign: "center",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
    textAlign: "center",
  },
  tr: {
    backgroundColor: "#fff",
  },
};

export default InventoryPage;
