import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#fff',
      fontFamily: 'Helvetica',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    header: {
      fontSize: 24,
      textAlign: 'center',
      color: 'black',
      marginBottom: 20,
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
    'Hello and thank you for this opportunity',
    'Hi there',
    'Greetings of the day',
    'Salutations',
    'Warm greetings',
    'To whom it may concern',
    'I hope this message finds you well',
    'Greetings to the [Department Name] team',
    'It’s a pleasure to connect with you',
    'I am excited to address this cover letter to you'
];

const closingSet: string[] = [
    'Sincerely',
    'Best regards',
    'Kind regards',
    'Yours truly',
    'Warm regards',
    'With best regards',
    'Respectfully',
    'Yours faithfully',
    'Thank you for your consideration',
    'With appreciation',
    'Cordially',
    'Looking forward to your response',
    'With sincere thanks',
    'Anticipating your reply',
    'In gratitude',
    'With eagerness for the opportunity',
    'Best wishes',
    'Thank you for your time and consideration',
    'Hope to hear from you soon',
    'Eagerly awaiting your reply'
];

interface PDFDocumentProps {
    bodyParagraph: string;
    position: string; 
    companyName: string; 
  }
  
  const PDFDocument: React.FC<PDFDocumentProps> = ({
    bodyParagraph,
    position="POSITION A", // ADD POSITION, COMPANY, AND INDIVIDUAL NAME ENDPOINTS
    companyName="COMPANY A",
  }) => {
    const randomIntro: string = introSet[Math.floor(Math.random() * introSet.length)].replace('[Company Name]', companyName);
    const randomClosing: string = closingSet[Math.floor(Math.random() * closingSet.length)];
  
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.content}>{randomIntro}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.content}>I am applying for the {position} position at {companyName}.</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.content}>{bodyParagraph}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.content}>I am motivated by the opportunity to join your team and contribute to your company's success.</Text>
          </View>
          <View style={styles.signature}>
            <Text>{randomClosing}</Text>
          </View>
          <View style={styles.footer}>
            <Text>Your Name</Text>
            <Text>Your Contact Information</Text>
          </View>
        </Page>
      </Document>
    );
  };
  
  export default PDFDocument;