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

const About = () => {
  const [data, setData] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const url = "https://4veg3aetvd.execute-api.us-east-2.amazonaws.com/dev/user";
  useEffect(() => {
    axios.get(url).then((json) => setData(json.data));

    console.log(data);
  });
  const renderTable = () => {
    return (
      data &&
      data.map((instance) => {
        return (
          <tr>
            <td>{instance.email}</td>
            <td>{instance.name}</td>
            <td>{instance.group}</td>
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
            <th>Email</th>
            <th>Name</th>
            <th>Group</th>
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
      <div className="user">Users</div>
      <div id="app">{master()}</div>
      <div className="policies"> Policies </div>
      <div>
        <table>
          <tr>
            <th> Policies </th>
            <th> Thresholds </th>
          </tr>
          <tr>
            <td>Jupyter Notebook of instance type ml.t2.medium</td>
            <td> 60 mins </td>
          </tr>
          <tr>
            <td> Jupyter Notebook of instance type ml.t2.large </td>
            <td> 30 mins </td>
          </tr>
          <tr>
            <td>
              {" "}
              Processing Job of instance ml.t3.medium 1 instance and 1GB
              additional Storage
            </td>
            <td> 4 hrs</td>
          </tr>
          <tr>
            <td>
              {" "}
              Training Job of instance ml.t3.medium 1 instance and 1GB
              additional Storage
            </td>
            <td> 4 hrs</td>
          </tr>
        </table>
      </div>
    </React.Fragment>
  );
};

export default About;
