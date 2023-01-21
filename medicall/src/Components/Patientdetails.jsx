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
import httpClint from "../httpClint";

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

    return (
        <Box m="20px auto" p="0 20px" maxWidth="700px" minHeight="85vh">
            <Header title="Doctor Details" subtitle="Enter your details" />

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
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Languages</FormLabel>
                                <RadioGroup
                                    aria-label="languages"
                                    name="languages"
                                    value={values.languages}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="Hindi" control={<Radio />} label="Hindi" />
                                    <FormControlLabel value="English" control={<Radio />} label="English" />
                                    <FormControlLabel value="Bengali" control={<Radio />} label="Bengali" />
                                    <FormControlLabel value="Telugu" control={<Radio />} label="Telugu" />
                                    <FormControlLabel value="Tamil" control={<Radio />} label="Tamil" />
                                    <FormControlLabel value="Marathi" control={<Radio />} label="Marathi" />
                                    <FormControlLabel value="Gujarati" control={<Radio />} label="Gujarati" />
                                    <FormControlLabel value="Kannada" control={<Radio />} label="Kannada" />
                                    <FormControlLabel value="Malayalam" control={<Radio />} label="Malayalam" />
                                    <FormControlLabel value="Odia" control={<Radio />} label="Odia" />
                                    <FormControlLabel value="Punjabi" control={<Radio />} label="Punjabi" />
                                    <FormControlLabel value="Urdu" control={<Radio />} label="Urdu" />
                                </RadioGroup>
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
                                color="primary"
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
