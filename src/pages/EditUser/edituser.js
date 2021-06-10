import React, { useState, useEffect } from "react";
import ReactDOM, { render } from "react-dom";
import axios from "axios";
import { Form, Field } from "react-final-form";
import ReactTable from "react-table";
//import '../../react-table/react-table.css';
import { TextField, Checkbox, Radio, Select } from "final-form-material-ui";
import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  CssBaseline,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel
} from "@material-ui/core";
// Picker

import { MuiPickersUtilsProvider } from "@material-ui/pickers";

const Edituser = () => {
  const [value, setValue] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [data, setData] = useState([]);
  const url =
    "https://0u6vb56kth.execute-api.us-east-2.amazonaws.com/dev/get-user-group";
  const handleClick = () => {
    setTrigger(true);
    axios
      .post(url, {
        name: value
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const renderTable = () => {};
  const onChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <React.Fragment>
      <div> Enter User Name: </div>
      <div>
        <input value={value} onChange={onChange} />
      </div>
      <div>
        <button onClick={handleClick}> Show Details </button>
      </div>
    </React.Fragment>
  );
};
export default Edituser;
