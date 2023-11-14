import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#fff',
      fontFamily: 'Helvetica',
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    body: {
      fontSize: 12,
      paddingTop: 20, 
      lineHeight: 1.5,
    },
    header: {
      fontSize: 10,
      textAlign: 'center',
      color: 'black',
      paddingBottom: 20,
    },
    content: {
      fontSize: 12,
      lineHeight: 1.5,
      textAlign: 'justify',
      marginBottom: 20,
    },
    footer: {
      fontSize: 12,
      textAlign: 'left',
      marginTop: 25,
      paddingTop: 10,
      borderTop: 1,
      borderColor: '#eeeeee',
    },
    signature: {
      marginTop: 15,
      fontSize: 14,
      textAlign: 'left',
      fontFamily: 'Times-Roman',
    },
  });

/*
'Dear [Company Name] Team',
'Good [time of day],',
'Dear [Department] Team',
'Hello [Company Name]',
*/
const introSet: string[] = [
    'Hello',
    'Hi',
    'Greetings',
    'Dear Hiring Manager',
    'Good day',
    'Hi there',
    'Greetings of the day',
    'Salutations',
    'Warm greetings',
    'To whom it may concern',
    'I hope this message finds you well',
];

const closingSet: string[] = [
    'Sincerely',
    'Kind regards',
    'Respectfully',
    'Thank you for your consideration',
    'With appreciation',
    'Looking forward to your response',
    'Anticipating your reply',
    'Best wishes',
    'Thank you for your time and consideration',
    'Hope to hear from you soon',
    'Eagerly awaiting your reply'
];

interface PDFDocumentProps {
    bodyParagraph: string;
    jobTitle: string; 
    companyName: string; 
    userName: string;
  }
  
  const PDFDocument: React.FC<PDFDocumentProps> = ({
    bodyParagraph,
    jobTitle,
    companyName,
    userName,
  }) => {
    const randomIntro: string = introSet[Math.floor(Math.random() * introSet.length)].replace('[Company Name]', companyName);
    const randomClosing: string = closingSet[Math.floor(Math.random() * closingSet.length)];
  
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.header} fixed>
            ~ Created on gecover.com. WIP ~
          </Text>
          <Text style={styles.body}>{randomIntro}, </Text>
          <Text style={styles.body}>I am applying for the {jobTitle} position at {companyName}.</Text>
          <Text style={styles.body}>{bodyParagraph}  </Text>
          {/* <Text style={styles.body}>I am motivated by the opportunity to join your team and contribute to your company's success.</Text> */}
          <Text style={styles.body}>{randomClosing},</Text>
          <Text style={styles.body}>{userName}</Text>
        </Page>
      </Document>
    );
  };
  
  export default PDFDocument;