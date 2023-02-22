import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import {Link} from "react-router-dom";
import { useEffect, useState } from 'react';
import { getList } from '../utils/s3.js';

export default function FileList() {
  const [files, setFiles] = useState([]);

  async function updateFiles(Prefix = "") {
    setFiles(await getList(""));
  }

  useEffect(() => {
    updateFiles();
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      updateFiles();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="xl" direction="row">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Наименование</TableCell>
          <TableCell align="right">Размер</TableCell>
          <TableCell align="right">Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((row) => (
            <TableRow
              key={row.Key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link to={`/files/${row.Key}`} title="Файлы">
                  {row.Key}
                </Link>
              </TableCell>
              <TableCell align="right">{row.Size}</TableCell>
              <TableCell align="right">

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}