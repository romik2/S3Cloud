import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";
import { useState } from 'react';

function Login() {
    const [url, setUrl] = useState("");
    const [region, setRegion] = useState("");
    const [accessKey, setAccessKey] = useState("");
    const [secretAccessKey, setSecretAccessKey] = useState("");
    const [bucket, setBucket] = useState("");

    const login = async () => {
        try {
            window.localStorage.setItem('connection', JSON.stringify({
                region: region,
                endpoint: url,
                credentials: {
                    accessKeyId: accessKey,
                    secretAccessKey: secretAccessKey,
                },
                Bucket: bucket
            }));
            const s3Client = new S3Client(JSON.parse(window.localStorage.getItem('connection')));
            await s3Client.send(new ListObjectsCommand(JSON.parse(window.localStorage.getItem('connection'))));
            window.location.reload(false);
        } catch (error) {
            window.localStorage.removeItem('connection');
            console.warn(error);
        }
    }

    return (
        <Container maxWidth="sm">
            <Box>
                <Stack
                    component="form"
                    spacing={2}
                    autoComplete="off">
                    <TextField id="url" value={url} onChange={(event) => {setUrl(event.target.value)}} label="URL" variant="outlined" size="small" />
                    <TextField id="rgion" value={region} onChange={(event) => {setRegion(event.target.value)}} label="Регион" variant="outlined" size="small" />
                    <TextField id="accessKey" value={accessKey} onChange={(event) => {setAccessKey(event.target.value)}} label="Access key" variant="outlined" size="small" />
                    <TextField id="secretAccessKey" value={secretAccessKey} onChange={(event) => {setSecretAccessKey(event.target.value)}} label="Secret access key" variant="outlined" size="small" />
                    <TextField id="bucket" value={bucket} onChange={(event) => {setBucket(event.target.value)}} label="Bucket" variant="outlined" size="small" />
                    <Button variant="contained" onClick={login}>Войти</Button>
                </Stack>
            </Box>
        </Container>
    );
  }
  
  export default Login;