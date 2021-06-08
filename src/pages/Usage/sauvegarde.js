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
import { Bar } from "react-chartjs-2";
// Picker

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "./table.css";

const Sauvegarde = () => {
  const [data, setData] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [trig, setTrig] = useState(false);
  const url = "https://4veg3aetvd.execute-api.us-east-2.amazonaws.com/dev/list";
  const handleClick = () => {
    setTrigger(true);
  };
  const handClick = () => {
    setTrig(true);
  };
  /*const handleClick = () => {
    axios.get(url).then((json) => setData(json.data));

    console.log(data);
  };*/
  useEffect(() => {
    axios.get(url).then((json) => setData(json.data));

    console.log(data);
  }, []);
  var ty1 = 0;
  var ty2 = 0;
  var arn = [];
  var time = [];
  data.map((instance) => {
    {
      var det = instance.iname + " " + instance.itype;
      arn.push(det);
      time.push(
        instance.itype === "ml.t2.medium" ? 60 - instance.tu : 30 - instance.tu
      );
      instance.itype === "ml.t2.medium" ? ty1++ : ty2++;
    }
  });
  const chart = () => {
    const bdata = {
      labels: arn,
      datasets: [
        {
          label: "# Time Used",
          data: time,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 0.2)"],
          borderWidth: 1
        }
      ]
    };
    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    };
    return <Bar data={bdata} options={options} />;
  };
  const rendsub = () => {
    var tu1 = 0;
    var tu2 = 0;
    var tt1 = ty1 * 60;
    var tt2 = ty2 * 30;
    data.map((instance) => {
      {
        instance.itype === "ml.t2.medium"
          ? (tu1 += instance.tu)
          : (tu2 += instance.tu);
      }
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Instance</th>
            <th>Type</th>
            <th>Total Time</th>
            <th>Time Used</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jupyter Notebook</td>
            <td>ml.t2.medium</td>
            <td>{tt1}</td>
            <td>{tt1 - tu1}</td>
          </tr>
          <tr>
            <td>Jupyter Notebook</td>
            <td>ml.t2.large</td>
            <td>{tt2}</td>
            <td>{tt2 - tu2}</td>
          </tr>
        </tbody>
      </table>
    );
  };
  const renderTable = () => {
    console.log("The type 1 " + ty1 + " The type 2 " + ty2);
    return (
      data &&
      data.map((instance) => {
        return (
          <tr>
            <td>{instance.type}</td>
            <td>{instance.itype}</td>
            <td>{instance.arn}</td>
            <td>{instance.iname}</td>
            <td>{instance.status}</td>
            <td>{instance.tl}</td>
            <td>
              {instance.itype === "ml.t2.medium"
                ? 60 - instance.tu
                : 30 - instance.tu}
            </td>
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
            <th>Type</th>
            <th>Instance Type</th>
            <th>Arn</th>
            <th>Name</th>
            <th>Status</th>
            <th>Threshold Time</th>
            <th>Actual Usage</th>
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
      <div>{rendsub()}</div>
      <div id="monb">
        <button onClick={handleClick}> Show Details </button>
        <button onClick={handClick}> Show Chart </button>
      </div>
      <div id="app">{trigger && master()}</div>
      <div id="ap">{trig && chart()}</div>
    </React.Fragment>
  );
};

export default Sauvegarde;
