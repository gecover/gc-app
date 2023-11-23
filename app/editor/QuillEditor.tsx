'use client';
import { Session } from '@supabase/supabase-js';
import dynamic from 'next/dynamic';
import React, { useState, useEffect, useRef, ChangeEvent, useCallback } from 'react';
import { Button, Box } from '@mui/material';
import { jsPDF } from 'jspdf';
import 'quill/dist/quill.snow.css';
import 'styles/quilleditor.css';
import { useGeCover } from '../../contexts/GeCoverContext';
import './ReactQuillWrapper';


const QuillNoSSRWrapper = dynamic(() => import('./ReactQuillWrapper'), {
    ssr: false,
    loading: () => <p>Loading...</p>
});

interface Props {
  session: Session;
  initialFile?: File;
}


export default function QuillEditor({ session, initialFile }: Props) {
    const { geCoverText } = useGeCover();
    const [text, setText] = useState<string>(geCoverText || '');


    const quillRef = useRef<ReactQuill | null>(null);
    const setQuillRef = useCallback(node => {
        if (node) {
          quillRef.current = node;
        }
      }, []);

    useEffect(() => {
        if (initialFile && initialFile.type === "text/plain") {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileText = e.target?.result;
                setText(fileText?.toString() || '');
            };
            reader.readAsText(initialFile);
        }
    }, [initialFile]);
  
    const handleTextFileSave = () => {
      const element = document.createElement('a');
      const file = new Blob([text], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = 'myFile.txt';
      document.body.appendChild(element);
      element.click();
    };
  
    const handlePDFSave = () => {
      const doc = new jsPDF();
      doc.text(text, 10, 10);
      doc.save('myFile.pdf');
    };

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file && file.type === "text/plain") {
          const reader = new FileReader();
          reader.onload = (e) => {
            const fileText = e.target?.result;
            setText(fileText?.toString() || '');
          };
          reader.readAsText(file);
        } else {
          alert('Only text files are supported for editing.');
        }
      };
  
    return (
        <>
        <Box className="quill-editor-container"> 
            <input type="file" onChange={handleFileUpload} accept=".txt" className="file-input" /> 
            <QuillNoSSRWrapper 
                ref={setQuillRef}
                theme="snow" 
                value={text} 
                onChange={setText}
                className="quill-editor" 
            />
            <Box className="editor-actions">
                <Button variant="contained" onClick={handleTextFileSave} className="save-button">
                    Save as Text
                </Button>
                <Button variant="contained" onClick={handlePDFSave} className="save-button">
                    Save as PDF
                </Button>
            </Box>
        </Box>
        </>
    );
};