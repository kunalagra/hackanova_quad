import React, { Fragment } from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 36,
        justifyContent: 'flex-end'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    invoiceDate: {
            fontSize: 12,
            fontStyle: 'bold',
    },
    label: {
        width: 60
    },
    name: {
        marginLeft: -15,
    }
    
  });

  const lname = localStorage.getItem("lastName");
  const Lname = lname? lname.toString() : "Lastname";
  const fname = localStorage.getItem("firstName");
  const Fname = fname? fname.toString() : "Firstname";


  const InvoiceNo = ({invoice}) => (
        <Fragment>
            <View style={styles.invoiceNoContainer}>
                <Text style={styles.label}>Invoice No:</Text>
                <Text style={styles.invoiceDate}>{invoice.invoice_no}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                    <Text style={styles.label}> Name:</Text>
                    <Text style={styles.name}>{Fname} {Lname}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.label}>Date: </Text>
                <Text >{invoice.trans_date}</Text>
            </View >
        </Fragment>
  );
  
  export default InvoiceNo