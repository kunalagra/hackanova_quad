import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../Components/Header";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ContactsIcon from '@mui/icons-material/Contacts';
import { Link } from "react-router-dom";

const About = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

 if (localStorage.getItem("token") === null || localStorage.getItem("token") === undefined) {
    window.location.href = "/login";
 }

  return (
    <Box m="20px" minHeight="85vh">
      <Header title="About Us" subtitle="Check out who we are!!" />
      <Typography color={colors.grey[200]} mr="20px">
        In today's world, where everything is available at tips of our finger,
        from ordering food to paying bills, good health consultation seems to be
        missing. WHO recommends 44.5 doctors per 10K population but India only
        has half ie 22.8 doctors for every 10K inhabitants. Often, people would
        love to have just a second opinion about their ongoing cold/other aches
        they are experiencing but due to the lengthy process of booking
        appointment, travelling, etc is both time consuming and expensive for
        them. The process is thus cumbersome and often discourages customers
        from seeking expert advice on cases which may develop something into
        fatal. So, right advice from an expert can definitely help to save many
        lives. There is also the problem of finding relevant doctors nearby.
        This is often the case for the majority of the country which don't live
        in metropolitan cities. Thus, having a good experts just a tap away
        would definitely help a lot of people in need. We could also thus save
        time for travelling for both patient and doctors too.
      </Typography>
      <br></br>
      <Typography color={colors.grey[200]} mr="20px">
        Medicall is a way to connect patients to right doctor or allow them to
        choose a doctor of their choice. To achieve this, we plan to use ML to
        identify common diseases based on information collected using Digital
        health ID and symptoms felt by the patient. Then, we predict the
        probability of common diseases and if appropriate directly recommend
        steps /remedy (with supervision). Alternatively, when there are mixed/no
        results or if patients requires, they can select from a pool of
        available doctors and connect with them. Relevant data will be forwarded
        to doctor for reference. For direct video call, we plan to use Jitsi. We
        also plan to have platforms like Whatsapp/E-Mail/etc present for more
        reliability. Final prescription will be made available to patient with
        Generic alternatives for medicines shown if available.
      </Typography>
      <Box width="60%" m="30px auto">
        <Box display="flex" alignItems="center" justifyContent="center">
        <ContactsIcon sx={{mr: "10px"}}/>
        <Typography
          variant="h4"
          color={colors.grey[100]}
          fontWeight="bold"
        >
           Our Socials
        </Typography>
        </Box>
      <Box display="flex" justifyContent="space-evenly" alignContent="center" mt="50px">
        <Box
          sx={{
            backgroundColor: colors.greenAccent[500],
            padding: "6px 10px",
            borderRadius: "7px",
            "&:hover":{
              backgroundColor: "#3ea68b",
            }
          }}
        >
          <Link
            to="//www.facebook.com/"
            target="_blank"
            style={{
              textDecoration: "none",
              color: colors.primary[500],
              display: "flex",
            }}
            >
              <FacebookIcon/>
              <Typography variant="h6" ml="2px" fontWeight="bold"> 
                  Facebook
              </Typography>
          </Link>
        </Box>
        <Box
          sx={{
            backgroundColor: colors.greenAccent[500],
            padding: "6px 10px",
            borderRadius: "7px",
            "&:hover":{
              backgroundColor: "#3ea68b",
            }
          }}
        >
          <Link
            to="//www.instagram.com/"
            target="_blank"
            style={{
              textDecoration: "none",
              color: colors.primary[500],
              display: "flex",
            }}
            >
            <InstagramIcon/>
            <Typography variant="h6" ml="2px" fontWeight="bold"> 
                Instagram
            </Typography>
        </Link>
        </Box>
        <Box
          sx={{
            backgroundColor: colors.greenAccent[500],
            padding: "6px 10px",
            borderRadius: "7px",
            "&:hover":{
              backgroundColor: "#3ea68b",
            }
          }}
        >
          <Link
            to="//www.twitter.com/"
            target="_blank"
            style={{
              textDecoration: "none",
              color: colors.primary[500],
              display: "flex",
            }}
            >
            <TwitterIcon/>
            <Typography variant="h6" ml="2px" fontWeight="bold"> 
                Twitter
            </Typography>
        </Link>
        </Box>
        <Box
          sx={{
            backgroundColor: colors.greenAccent[500],
            padding: "6px 10px",
            borderRadius: "7px",
            "&:hover":{
              backgroundColor: "#3ea68b",
            }
          }}
        >
          <Link
            to="//www.linkedin.com/"
            target="_blank"
            style={{
              textDecoration: "none",
              color: colors.primary[500],
              display: "flex",
            }}
            >
            <LinkedInIcon/>
            <Typography variant="h6" ml="2px" fontWeight="bold"> 
                LinkedIn
            </Typography>
        </Link>
        </Box>
        </Box>
        </Box>
    </Box>
  );
};

export default About;
