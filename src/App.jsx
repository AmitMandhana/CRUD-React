import React, { useState } from 'react';
import { EmployeeData } from './EmployeeData';

function App() {
  const [data, setData] = useState(EmployeeData);
  const [formData, setFormData] = useState({ slNo: '', firstName: '', lastName: '', age: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setFormData(data[index]);
  };

  const handleSave = () => {
    if (isAdding) {
      setData([...data, formData]);
    } else {
      const newData = [...data];
      newData[editIndex] = formData;
      setData(newData);
    }
    setIsAdding(false);
    setIsEditing(false);
    setFormData({ slNo: '', firstName: '', lastName: '', age: '' });
  };

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`container${darkMode ? '-dark' : ''}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mt-4 mb-0">Employee List</h1>
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" id="darkModeToggle" checked={darkMode} onChange={toggleDarkMode} />
          <label className="form-check-label" htmlFor="darkModeToggle">Dark Mode</label>
        </div>
      </div>
      <button className="btn btn-primary mb-4" onClick={handleAdd}>Add Employee</button>
      {isAdding || isEditing ? (
        <div className="mb-4 p-4" style={{ backgroundColor: darkMode ? '#343a40' : '#f8f9fa', color: darkMode ? 'white' : 'black' }}>
          <input type="text" name="slNo" value={formData.slNo} placeholder="Sl No" onChange={handleInputChange} className="form-control mb-2" />
          <input type="text" name="firstName" value={formData.firstName} placeholder="First Name" onChange={handleInputChange} className="form-control mb-2" />
          <input type="text" name="lastName" value={formData.lastName} placeholder="Last Name" onChange={handleInputChange} className="form-control mb-2" />
          <input type="text" name="age" value={formData.age} placeholder="Age" onChange={handleInputChange} className="form-control mb-2" />
          <button className="btn btn-success mr-2" onClick={handleSave}>Save</button>
          <button className="btn btn-secondary" onClick={() => { setIsAdding(false); setIsEditing(false); }}>Cancel</button>
        </div>
      ) : null}
      <table className={`table table-hover${darkMode ? ' table-dark' : ''}`}>
        <thead>
          <tr>
            <th>Sl No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.slNo}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td>
                <button className="btn btn-primary mr-2" onClick={() => handleEdit(index)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
