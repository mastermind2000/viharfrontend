import React, { useState } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
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

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    group: "",
    policy: "",
    account: "",
    id: ""
  });
  const onSubmit = async (values) => {
    const url =
      "https://4veg3aetvd.execute-api.us-east-2.amazonaws.com/dev/entry";
    Axios.post(url, {
      name: values.name,
      email: values.email,
      role: values.role,
      group: values.group,
      policy: values.policy
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(values);
    window.alert(JSON.stringify(values, 0, 2));
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    }
    if (!values.group) {
      errors.group = "Select a group";
    }
    return errors;
  };
  const Condition = ({ when, is, children }) => (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) => (value === is ? children : null)}
    </Field>
  );
  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
      <CssBaseline />
      <Form
        onSubmit={onSubmit}
        initialValues={{
          role: "student",
          account: "existingid",
          policy: "Policy1",
          id: "405985712632"
        }}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    required
                    name="name"
                    component={TextField}
                    type="text"
                    label="Name"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    name="email"
                    fullWidth
                    required
                    component={TextField}
                    type="email"
                    label="Email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Add Roles</FormLabel>
                    <RadioGroup row>
                      <FormControlLabel
                        label="Student"
                        control={
                          <Field
                            name="role"
                            component={Radio}
                            type="radio"
                            value="student"
                          />
                        }
                      />
                      <FormControlLabel
                        label="Faculty"
                        control={
                          <Field
                            name="role"
                            component={Radio}
                            type="radio"
                            value="faculty"
                          />
                        }
                      />
                      <FormControlLabel
                        label="Admin"
                        control={
                          <Field
                            name="role"
                            component={Radio}
                            type="radio"
                            value="admin"
                          />
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Condition when="role" is="student">
                    <Field
                      fullWidth
                      name="group"
                      component={Select}
                      label="Apply Group"
                      formControlProps={{ fullWidth: true }}
                    >
                      <MenuItem value="Student">Student</MenuItem>
                    </Field>
                  </Condition>
                  <Condition when="role" is="faculty">
                    <Field
                      fullWidth
                      name="group"
                      component={Select}
                      label="Apply Group"
                      formControlProps={{ fullWidth: true }}
                    >
                      <MenuItem value="Faculty">Faculty</MenuItem>
                    </Field>
                  </Condition>
                  <Condition when="role" is="admin">
                    <Field
                      fullWidth
                      name="group"
                      component={Select}
                      label="Apply Group"
                      formControlProps={{ fullWidth: true }}
                    >
                      <MenuItem value="Admin">Admin</MenuItem>
                    </Field>
                  </Condition>
                </Grid>
                <Grid item xs={12}>
                  <Condition when="role" is="student">
                    <Field
                      fullWidth
                      name="policy"
                      component={Select}
                      label="Select Policies"
                      formControlProps={{ fullWidth: true }}
                    >
                      <MenuItem value="Policy1">
                        {" "}
                        Jupyter Notebook of instance type ml.t2.medium for 60
                        mins duration Jupyter Notebook of instance type
                        ml.t2.large for 30 mins duration Processing Job of
                        instance ml.t3.medium with instance count 1 and
                        additional volume for storage 1GB Training Job of
                        instance ml.t3.medium with instance count 1 and
                        additional volume for storage 1GB
                      </MenuItem>
                    </Field>
                  </Condition>
                </Grid>
                <Grid item xs={12}>
                  <Condition when="role" is="student">
                    <table>
                      <tr>
                        <th> Policies </th>
                        <th> Thresholds </th>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          Jupyter Notebook of instance type ml.t2.medium{" "}
                        </td>
                        <td> 60 mins </td>
                      </tr>
                      <tr>
                        <td> Jupyter Notebook of instance type ml.t2.large </td>
                        <td> 30 mins </td>
                      </tr>
                      <tr>
                        <td> Processing Job of instance ml.t3.medium </td>
                        <td> 1 instance and 1GB additional Storage</td>
                      </tr>
                      <tr>
                        <td> Training Job of instance ml.t3.medium </td>
                        <td> 1 instance and 1GB additional Storage</td>
                      </tr>
                    </table>
                  </Condition>
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      Where Do You want to create user
                    </FormLabel>
                    <RadioGroup row>
                      <FormControlLabel
                        label="Existing ID"
                        control={
                          <Field
                            name="account"
                            component={Radio}
                            type="radio"
                            value="existingid"
                          />
                        }
                      />
                      <FormControlLabel
                        label="Create a new Account"
                        control={
                          <Field
                            name="account"
                            component={Radio}
                            type="radio"
                            value="newaccount"
                          />
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Condition when="account" is="existingid">
                    <Field
                      fullWidth
                      required
                      name="id"
                      component={TextField}
                      type="text"
                      label="Account ID"
                    />
                  </Condition>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <pre> {JSON.stringify(values, 0, 2)} </pre>
          </form>
        )}
      />
    </div>
  );
}
