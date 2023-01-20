import React from 'react';
import {PDFViewer} from '@react-pdf/renderer'
import Invoice from "./scenes/Invoice/Invoice";
import invoice from "./data/invoice";

import './assets/logo2.jpeg';
import './App.css';

const Invoicemain = () => {
    return (
        <React.Fragment>
            <PDFViewer width="1000" height="600" className="app" >
                <Invoice invoice={invoice}/>
            </PDFViewer>
        </React.Fragment>
    );
}

export default Invoicemain;