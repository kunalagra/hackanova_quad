import { TextField, Box, Button } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import httpClint from "../../httpClint";


const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const initialValues = {
    registerer: "patient",
  firstName: "",
  lastName: "",
  password: "",
  phone: "",
  email: "",
  gender: "male",
};

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  phone: yup.string().matches(phoneRegExp, "Enter Digits Only").required("required"),
  email: yup.string().email("Invalid Email").required("required"),
  // password: yup.string().matches(!psswdRegExp, "*Password should 8-20 characters consists of at least one digit, one upper case, one lower case, one special character(!@#$%&*()-+=^.) excluding white space").required("required"),
  password: yup.string().required("required"),
});

const SignUp = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const handleFormSubmit = async (values) => {
    console.log(values);
    const { data } = await httpClint.post("/register", values);
    console.log(data);
  };

  return (
    <Box m="20px auto" p="0 20px" maxWidth="700px" minHeight="85vh">
      <Header title="Sign Up" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
              }}
            >
              <FormControl
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.registerer}
                sx={{gridColumn: "span 2"}}
                required
              >
                <FormLabel>Register as</FormLabel>
                <RadioGroup row name="registerer">
                  <FormControlLabel
                    value="patient"
                    control={<Radio color="secondary" />}
                    label="Patient"
                  />
                  <FormControlLabel
                    value="doctor"
                    control={<Radio color="secondary" />}
                    label="Doctor"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 1" }}
              />
              <FormControl
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gender}
                required
              >
                <FormLabel>Gender</FormLabel>
                <RadioGroup row name="gender">
                  <FormControlLabel
                    value="male"
                    control={<Radio color="secondary" />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio color="secondary" />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio color="secondary" />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Create a Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="start" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                sx={{ fontWeight: "bold" }}
              >
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default SignUp;
