import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserList.css";
function UpdateForm() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ username: "", password: "" });

  useEffect(() => {
    axios
      .get("http://localhost:8080/getUsers")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setFormData({ username: user.username, password: user.password });
  };

  const handleSaveClick = () => {
    if (selectedUser) {
      axios
        .put(`http://localhost:8080/updateUser/${selectedUser.id}`, formData)
        .then((response) => {
          console.log(response.data);
          setSelectedUser(null);
          setFormData({ username: "", password: "" });
          // Refresh user data
          axios.get("http://localhost:8080/getUsers").then((response) => {
            setUsers(response.data);
          });
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    }
  };
  const handleDelete = (userId) => {
    // Make a DELETE request to your backend to delete the user
    axios
      .delete(`http://localhost:8080/deleteUser/${userId}`)
      .then((response) => {
        console.log(response.data);
        // Update the users list after deletion
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

//   const handleDeleteClick = () => {
//     if (selectedUser) {
//       axios
//         .delete(`http://localhost:8080/deleteUser/${selectedUser.id}`)
//         .then((response) => {
//           console.log(response.data);
//           setSelectedUser(null);
//           setFormData({ username: "", password: "" });
//           // Refresh user data
//           axios.get("http://localhost:8080/getUsers").then((response) => {
//             setUsers(response.data);
//           });
//         })
//         .catch((error) => {
//           console.error("Error deleting user:", error);
//         });
//     }
//   };

  return (
    <div className="App">
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>
                <button onClick={() => handleUpdateClick(user)}>Edit</button>
                
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <div>
          <h2>Update User</h2>
          <label>
            Username:
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </label>
          <button onClick={handleSaveClick}>Save</button>
        </div>
      )}
    </div>
  );
}

export default UpdateForm;
