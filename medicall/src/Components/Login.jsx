import { TextField, Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import { Link } from "react-router-dom";
import httpClint from "../httpClint";

const initialValues = {
  email: "",
  password: "",
};
 
const checkoutSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("required"),
  password: yup.string().required("required"),
});

const LogIn = () => {
  // sessionStorage.clear()
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const handleFormSubmit = async (values) => {
    // console.log(values);
    httpClint.post('/login', values).then((res) => {
       if (res.status === 200) {
            localStorage.setItem("token", res.data.access_token);
            localStorage.setItem("registerAs", res.data.registerAs);
            window.location.href = "/"
       }
    }).catch((err) => {
        console.log(err);
    });
};

  return (
    <Box m="20px auto" p="0 20px" maxWidth="700px" minHeight="85vh">
      <Header title="Log In" subtitle="Welcome Back!!" />

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
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 1" }}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="start"
              mt="20px"
              alignItems="center"
            >
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                sx={{ fontWeight: "bold" }}
              >
                Login
              </Button>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Typography variant="h5" color={colors.grey[300]} ml="10px">
                  Create a new account?
                </Typography>
              </Link>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default LogIn;
