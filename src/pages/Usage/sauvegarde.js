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
import "./table.css";

const Sauvegarde = () => {
  const [data, setData] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const url = "https://4veg3aetvd.execute-api.us-east-2.amazonaws.com/dev/list";
  const handleClick = () => {
    axios.get(url).then((json) => setData(json.data));

    console.log(data);
  };
  const renderTable = () => {
    return (
      data &&
      data.map((instance) => {
        return (
          <tr>
            <td>{instance.arn}</td>
            <td>{instance.iname}</td>
            <td>{instance.status}</td>
            <td>{instance.tl}</td>
          </tr>
        );
      })
    );
  };
  const master = () => {
    return (
      <table className="table">
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
    );
  };
  const secondary = () => {
    const columns = [
      {
        Header: "ARN",
        ancessor: "arn"
      },
      {
        Header: "Instance Name",
        ancessor: "iname"
      },
      {
        Header: "Status",
        ancessor: "statud"
      },
      {
        Header: "Time Left",
        ancessor: "tl"
      }
    ];
    return <ReactTable data={data} columns={columns} />;
  };
  return (
    <React.Fragment>
      <div>
        <button onClick={handleClick}>Load</button>
      </div>
      <div id="app">{data.length > 0 && master()}</div>
    </React.Fragment>
  );
};

export default Sauvegarde;
