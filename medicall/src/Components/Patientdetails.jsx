import { TextField, Box, Button,useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import React, { Component } from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import httpClint from "../httpClint";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

// get doctor details like speciality, languages, certificationsId, whatsappNo

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const initialValues = {
    languages: "Hindi",
    PatientId: "",
    whatsappNo: "",
}

const checkoutSchema = yup.object().shape({
    languages: yup.string().required("required"),
    PatienId: yup.string().required("required"),
    whatsappNo: yup.string().matches(phoneRegExp, "Enter Digits Only").required("required"),
});



const PatientDetails = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width: 600px)");

    const handleFormSubmit = async (values) => {
        console.log(values);
        const { data } = await httpClint.post('/patient/details', values).then((res) => {
            window.location = "/";
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
        console.log(data);
    };

    const [languages, setLanguages] = React.useState('');

    const handleChange = (event) => {
        setLanguages(event.target.value);
    };

    return (
        <Box m="20px auto" p="0 20px" maxWidth="700px" minHeight="85vh">
            <Header title="Patient Details" subtitle="Enter your details" />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box mb="30px"
                            sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
              }}
                        >
                            <FormControl sx={{ m: 1, width:500 }} component="fieldset">
                                <FormLabel component="legend"></FormLabel>
                                {/* create dropdoe */}
                                <InputLabel id="demo-simple-select-label">Languages</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={languages}
                                    label="Languages"
                                    onChange={handleChange}

                                >
                                    <MenuItem value="Hindi">Hindi</MenuItem>
                                    <MenuItem value="English">English</MenuItem>
                                    <MenuItem value="Telugu">Telugu</MenuItem>
                                    <MenuItem value="Tamil">Tamil</MenuItem>
                                    <MenuItem value="Kannada">Kannada</MenuItem>
                                    <MenuItem value="Malayalam">Malayalam</MenuItem>
                                    <MenuItem value="Marathi">Marathi</MenuItem>
                                </Select>

                            </FormControl>
                        </Box>
                        <Box mb="30px">
                        </Box>
                        <Box mb="30px">
                            <TextField
                                fullWidth
                                id="PatienId"
                                name="PatienId"
                                label="Paitent Id"
                                variant="outlined"
                                value={values.PatienId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.PatienId && Boolean(errors.PatienId)}
                                helperText={touched.PatienId && errors.PatienId}
                            />
                        </Box>
                        <Box mb="30px">
                            <TextField
                                fullWidth
                                id="whatsappNo"
                                name="whatsappNo"
                                label="Whatsapp No"
                                variant="outlined"
                                value={values.whatsappNo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.whatsappNo && Boolean(errors.whatsappNo)}
                                helperText={touched.whatsappNo && errors.whatsappNo}
                            />
                        </Box>
                        <Box mb="30px">
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="secondary"
                                disabled={isSubmitting}
                            >
                                Submit
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default PatientDetails;
