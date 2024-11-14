import { Button, FormControl, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { uploadDetailsApi } from "./services/allApi";
import { Link, useNavigate } from "react-router-dom";
import alldetails from "./Emptable";


const Employeedit = () => {
  const [employe, setEmploye] = useState({
    Id: '', Name: '', Email: '', status: ''
  })
  const navigate = useNavigate()












  const handleUpload = async () => {
    const { Id, Name, Email, status } = employe
    if (Id && Name && Email && status) {
      try {
        const response = await uploadDetailsApi(employe)
        if (response.status >= 200 && response.status < 300) {
          setEmploye({ ...employe, Id: '', Name: '', Email: '', status: '' })
          alert("sucessful")
          navigate("/")
        }
      } catch (err) {
        console.log(err);

      } // alert("working")


    } else {
      alert("fill the form completly")
    }
  }

  console.log(alldetails);



  return (
    <div className="flex flex-row justify-center items-center b" style={{ minHeight: "100vh", backgroundImage: `url('https://www.popsci.com/wp-content/uploads/2022/02/02/Depositphotos_415728530_XL-scaled.jpg?w=1041&h=694')`,
      backgroundSize:"cover"}} >
      <div className="flex  justify-center items-center bg-white rounded ">
        <form className="m-10">
          <h1 className="text-center font-bold">Book Details</h1>
          <div className="m-3">
            <TextField id="outlined-basic" onChange={e => setEmploye({ ...employe, Id: e.target.value })} label="ID" variant="outlined" className='w-100 ' />
          </div>
          <div className="m-3">
            <TextField id="outlined-basic" onChange={e => setEmploye({ ...employe, Name: e.target.value })} label="Book Name" variant="outlined" className='w-100 ' />
          </div>

          <div className="m-3">
            <TextField id="outlined-basic" type="email" onChange={e => setEmploye({ ...employe, Email: e.target.value })} label="Price" variant="outlined" className='w-100 ' />
          </div>

          <div className=' w-100'>
            <FormControl margin="normal" className="w-96 m-3">
              <TextField
                select
                label="Status"
                value={employe.status} // Use the correct state value
                onChange={(e) => setEmploye({ ...employe, status: e.target.value })}
                variant="outlined"
                fullWidth // Ensures the dropdown stretches to the full width of its container
              >
                <MenuItem value="In Stock">In Stock</MenuItem>
                <MenuItem value="Out of Stoke">Out of Stock</MenuItem>
              </TextField>
            </FormControl>




          </div>


          <Button onClick={handleUpload} variant="contained" color="success">submit</Button>
        </form>
      </div>

    </div>
  );
};

export default Employeedit;
