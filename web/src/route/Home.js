import Container from '@mui/material/Container';
import { getConnection } from '../utils/s3.js';

export default function Home() {
  return (
    <Container maxWidth="xl" direction="row">
        <h1>Добро пожаловать на сервер {getConnection().endpoint}!</h1>
    </Container>
  );
}