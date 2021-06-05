import React, { useState, useEffect } from "react";
import ReactDOM, { render } from "react-dom";
import axios from "axios";
import { Form, Field } from "react-final-form";
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

const Sauvegarde = () => {
  const [data, setData] = useState([]);
  const url = "https://4veg3aetvd.execute-api.us-east-2.amazonaws.com/dev/list";
  useEffect(() => {
    axios.get(url).then((json) => setData(json.data));
  }, []);
  const renderTable = () => {
    return data.map((instance) => {
      return (
        <tr>
          <td>{instance.arn}</td>
          <td>{instance.iname}</td>
          <td>{instance.status}</td>
          <td>{instance.tl}</td>
        </tr>
      );
    });
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Arn</th>
            <th>Name</th>
            <th>Status</th>
            <th>Time Left</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
  );
};

export default Sauvegarde;
