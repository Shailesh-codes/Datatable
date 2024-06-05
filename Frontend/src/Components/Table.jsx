import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function Table() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editID, setEditID] = useState(-1);
  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = data.length + 1;
    axios
      .post("http://localhost:3001/users", {
        id: id,
        name: name,
        email: email,
      })
      .then(() => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    axios
      .get("http://localhost:3001/users/" + id)
      .then((res) => {
        setUpdateName(res.data.name);
        setUpdateEmail(res.data.email);
      })
      .catch((err) => console.log(err));
    setEditID(id);
  };

  const handleUpdate = () => {
    axios
      .put("http://localhost:3001/users/" + editID, {
        id: editID,
        name: updateName,
        email: updateEmail,
      })
      .then((res) => {
        console.log(res);
        location.reload();
      });
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/users/" + id)
      .then((res) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button>Add</button>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) =>
            user.id === editID ? (
              <tr key={""}>
                <td>{user.id}</td>
                <td>
                  <input
                    type="text"
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={updateEmail}
                    onChange={(e) => setUpdateEmail(e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={handleUpdate}>Update</button>
                </td>
              </tr>
            ) : (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleEdit(user.id)} id="edit">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user.id)} id="delete">
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
