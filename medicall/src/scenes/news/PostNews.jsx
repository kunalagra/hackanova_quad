import { TextField, Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Components/Header";
import httpClint from "../../httpClint";

// get news from doctor inputs are title, author, body

const initialValues = {
    title: "",
    body: "",
};

const checkoutSchema = yup.object().shape({
    title: yup.string().required("required"),
    body: yup.string().required("required"),
});

const PostNews = () => {
    // sessionStorage.clear()
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const isNonMobile = useMediaQuery("(min-width: 600px)");

    const handleFormSubmit = async (values) => {
        // console.log(values);
        values["author"] = "Dr."+" "+localStorage.getItem("firstName")+ " " + localStorage.getItem("lastName");
        // console.log(values);
        httpClint.post('/news', values).then((res) => {
            if (res.status === 200) {
                window.location.href = "/news"
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <Box m="20px auto" p="0 20px" maxWidth="700px" minHeight="85vh">
            <Header title="Post News" subtitle="Welcome Back!!" />

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
                            sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
              }}
                        >
                            <TextField
                                name="title"
                                label="Title"
                                variant="outlined"
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.title && Boolean(errors.title)}
                                helperText={touched.title && errors.title}
                            />
                            <TextField
                                name="body"
                                label="Body"
                                variant="outlined"
                                value={values.body}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.body && Boolean(errors.body)}
                                helperText={touched.body && errors.body}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                            >
                                Post
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
}

export default PostNews;