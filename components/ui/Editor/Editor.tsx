import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItemButton from '@mui/joy/ListItemButton';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import { useState } from 'react';

interface EditorProps {
    chunks: Array<string>;
}

const Editor = ({ chunks } : EditorProps) => {
    const [chunkIndex, setChunkIndex] = useState(0);

    return(
        <Stack  direction="row"
        justifyContent="center"
        alignItems="center" sx={{width: '100%', backgroundColor: 'whitesmoke', padding: '1rem', borderRadius: 'lg'}}>
            <Sheet sx={{width: '15vw', minHeight: 300, maxHeight: 300, overflow: 'auto', borderRadius: 'sm'  }}>
                {
                    chunks.length > 0 && (
                        <List size="sm">
                            {chunks.map((__, index) => (
                                <ListItem key={index} onClick={() => setChunkIndex(index)}>
                                    <ListItemButton>Chunk {index + 1}</ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    )
                }
            </Sheet>
            <Sheet sx={{
                minHeight: 300, // Set desired height
                width: '25vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                padding: 2
            }}>
                <h1>Chunk {chunkIndex + 1} </h1>
                <p>{chunks[chunkIndex]}</p>
                <Button color="primary" variant="outlined" onClick={function(){}} sx={{ marginTop: 'auto', alignSelf: 'flex-end'}}> add chunk </Button>     

            </Sheet>

        </Stack>
    )
}

export default Editor;