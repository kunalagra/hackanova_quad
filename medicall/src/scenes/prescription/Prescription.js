import React from "react";
import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
import PrescriptionTitle from './PrescriptionTitle'
import logo from '../../assets/logo2.jpeg'


const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11, 
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    }, 
    logo: { 
        width: 74,
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
  });

    const Prescription = ({}) => (
            <Document>
                <Page size="A4" style={styles.page}>
                    <Image style={styles.logo} src={logo} />
                    <PrescriptionTitle title='Prescription'/>
                </Page>
            </Document>
    );

    export default Prescription