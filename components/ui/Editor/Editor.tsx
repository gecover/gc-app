import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItemButton from '@mui/joy/ListItemButton';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import { useState, ChangeEvent } from 'react';
import Textarea from '@mui/joy/Textarea';
import { Input } from '@mui/joy';

interface EditorProps {
    chunks: Array<string>;
    setChunks: React.Dispatch<React.SetStateAction<string[]>>;
}

const Editor = ({ chunks, setChunks } : EditorProps) => {
    const [chunkIndex, setChunkIndex] = useState(0);

    const handleUpdate = (event: ChangeEvent<HTMLTextAreaElement>) => {
        let oldChunks = chunks;
        oldChunks[chunkIndex] = event.target.value;
        setChunks(oldChunks)
    }

    const addNewChunk = () => {
        let oldChunks = chunks;
        oldChunks.push('');
        setChunks(oldChunks)
        setChunkIndex(oldChunks.length - 1)
    }

    const deleteChunk = () => {
        let oldChunks = chunks;
        oldChunks.splice(chunkIndex, 1);
        setChunks(oldChunks)
        setChunkIndex(0)
    }

    return(
        <Stack  direction="row"
        justifyContent="flex-start"
        alignItems="flex-start" sx={{ width: '100%', backgroundColor: 'whitesmoke', padding: '1rem', borderRadius: 'lg'}}>
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
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                padding: 2,
            }}>
                <h1>Chunk {chunkIndex + 1} </h1>
                <Textarea key={'chunk'+chunkIndex} onChange={handleUpdate} defaultValue={chunks[chunkIndex]} sx={{width: '100%'}}/>
                <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="flex-end" sx={{marginTop: 'auto', alignSelf: 'flex-end'}}>
                    <Button color="danger" variant="outlined" onClick={deleteChunk} sx={{ marginTop: 'auto', alignSelf: 'flex-end'}}> delete chunk </Button>     
                    <Button color="primary" variant="outlined" onClick={addNewChunk} sx={{ marginTop: 'auto', alignSelf: 'flex-end'}}> add chunk </Button>     
                </Stack>
            </Sheet>

        </Stack>
    )
}

export default Editor;