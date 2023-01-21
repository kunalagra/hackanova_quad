import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Prescription from "./Prescription";
import prescription from "../../data/prescription";

import "../../assets/logo2.jpeg";
import "./Prescriptionmain.css";

const Prescriptionmain = () => {
    return (
        <PDFViewer
            id = "prescription-pdf" 
            // width="1000" 
            // height="600" 
            className="app"
            >
        <Prescription prescription={prescription} />
        
        </PDFViewer>
    );
    }; 

    export default Prescriptionmain