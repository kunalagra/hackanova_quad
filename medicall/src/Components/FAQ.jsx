import { Box, useTheme } from "@mui/material";
import Header from "../Components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px" minHeight="85vh">
      <Header title="FAQ" subtitle="Frequently Asked Questions" />
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What is MediCall?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            It is a way to connect patients to right doctor or allow them to
            choose a doctor of their choice.<br></br>
            Check out the About us Page for more information.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What are the benefits of MediCall?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            With the approach of broadband and video conferencing, numerous
            people have swung to online web-portals to get an online
            consultation. Utilization of this technological innovation has
            numerous advantages for both the doctor as well as the patient,
            including cost savings, comfort, accessibility, and enhanced privacy
            and communication.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How Doctors will be beneficial?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Doctors can earn respect and money by using economies of scale since
            India is a huge country with a median age of 27 and demand for such
            software will increase since number of doctors per lakh population
            is less. Also Better awareness of diseases in rural parts of country
            at affordables rates to customers.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What if patient has some internal injury/vitals are needed for
            judgement?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Due to virtual mode, we can diagnose external body problems to
            higher degree. If a patient is facing internal injuries, it would be
            difficult to diagnose. Using modern Smartphones we are capable to
            measure heartbeats and other vitals so we can gather them to make
            better judgements virtually and help to avoid worst case scenarios
            for the patients..
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Possible Communication Barriers between Patient & Doctors?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Network issues may cause delay in audio/video, disconnect them. Not
            having appropriate hardware for camera can lead to poor quality,
            blurriness, etc in video. Thus alterate platforms will be made
            available for contact.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How would you deal with Long Tail (i.e., some doctors are more
            popular)?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            If a large no. of patients appointing to a doctor simultaneously
            then it will be difficult for the doctor to handle all the patients
            and also leads to a delay in the process.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
