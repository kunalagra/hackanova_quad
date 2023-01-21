import React, { Fragment } from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';
import httpClint from "./../httpClint";
import { useState } from "react";

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

  const data = httpClint.get("/get-pres")
  .then(function (response) {
    console.log(response);
    return response;
    })
    .catch(function (error) {
    console.log(error);
    }
    );

//   display data

 const prescription = () => (
        <Fragment>
            <View style={styles.invoiceNoContainer}>
                <Text style={styles.label}>{data}</Text>
            </View >
        </Fragment>
    );

    export default prescription
