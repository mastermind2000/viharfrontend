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
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    const url =
      "https://4veg3aetvd.execute-api.us-east-2.amazonaws.com/dev/list";
    axios(url)
      .then((response) => {
        setIsLoading(false);
        console.log("RES", response.data);
        setItem(response.data);
        console.log("TEST", item);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Error", error);
      });
  };
  const content = isLoading ? (
    <div> Processing.... </div>
  ) : (
    <div>
      <pre> {JSON.stringify(item, null, 2)} </pre>
    </div>
  );

  return <div> {content} </div>;
};

export default Sauvegarde;
