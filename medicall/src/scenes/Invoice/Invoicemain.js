import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Invoice from "./Invoice";
import invoice from "../../data/invoice";

import "../../assets/logo2.jpeg";
import "./Invoicemain.css";

const Invoicemain = () => {
  return (
    <PDFViewer
        id = "invoice-pdf" 
        // width="1000" 
        // height="600" 
        className="app"
        >
      <Invoice invoice={invoice} />
    </PDFViewer>
  );
};

export default Invoicemain;
