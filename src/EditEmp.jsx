import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeByIdAPI, updateEmployeeAPI } from "./services/allApi";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    Id: "",
    Name: "",
    Email: "",
    status: "",
  });
  const [error, setError] = useState("");

  // Fetch employee data based on ID
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getEmployeeByIdAPI(id); // Store the response
        const fetchedEmployee = response.data; // Access the data property

        console.log(fetchedEmployee); // Check the structure

        // Ensure the fetched data is structured correctly
        if (fetchedEmployee) {
          setEmployee({
            Id: fetchedEmployee.Id || "",
            Name: fetchedEmployee.Name || "",
            Email: fetchedEmployee.Email || "",
            status:
              fetchedEmployee.status === "Out of Stock" ? "Out of Stock" : "In Stock",
          });
        } else {
          setError("Book not found");
        }
      } catch (err) {
        setError("Error fetching Book details");
        console.error("Error:", err);
      }
    };

    fetchEmployee();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {Id, Name, Email,status } = employee;

    // Basic form validation
    if (!Id||!Name || !Email||!status) {
      setError("Please fill out all required fields");
      return;
    }

    try {
      await updateEmployeeAPI(id, employee);
      alert("Book updated successfully!");
      navigate("/");
    } catch (err) {
      setError("Error updating Book");
      console.error("Error:", err);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <div
        className="shadow p-4"
        style={{ borderRadius: "8px", backgroundColor: "white" }}
      >
        <h1 style={{ textAlign: "center" }}>Edit Book Details</h1>

        {/* Error message display */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <TextField
              name="Id"
              label="Id"
              fullWidth
              margin="normal"
              value={employee.Id} // Pre-populate the input field with fetched data
              onChange={handleChange}
              variant="outlined"
            />
          </div>
          <div className="mb-3">
            <TextField
              name="Name"
              label="Name"
              fullWidth
              margin="normal"
              value={employee.Name} // Pre-populate the input field with fetched data
              onChange={handleChange}
              variant="outlined"
            />
          </div>

          <div className="mb-3">
            <TextField
              name="Price"
              label="Price"
              type="text"
              fullWidth
              margin="normal"
              value={employee.Email} // Pre-populate the input field with fetched data
              onChange={handleChange}
              variant="outlined"
            />
          </div>

          <div className="mb-3">
            <FormControl fullWidth margin="normal">
              <TextField
                select
                name="status"
                label="status"
                value={employee.status} // Pre-populate the input field with fetched data
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem value="In Stock">In Stock</MenuItem>
                <MenuItem value="Out of Stock">Out of Stock</MenuItem>
              </TextField>
            </FormControl>
          </div>

          <div className="mb-3 text-center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                width: "150px",
                height: "50px",
                marginRight: "20px",
                backgroundColor: "black",
              }}
            >
              Update Details
            </Button>
            <Button
              type="button"
              variant="contained"
              style={{
                width: "150px",
                height: "50px",
                backgroundColor: "black",
              }}
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
