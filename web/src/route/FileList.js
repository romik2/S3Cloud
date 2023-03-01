import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { useEffect, useState } from 'react';
import UploadFile from '../component/UploadFile';
import { getList, deleteFile, downloadFile } from '../utils/s3.js';
import MenuFileList from '../component/MenuFileList';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function FileList() {
  const [files, setFiles] = useState([]);
  const [prefix, setPrefix] = useState('');
  const [open, setOpen] = useState(false);

  const convertSize = (byte) => {
    if (Math.trunc(byte / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024)) {
      return `${(byte / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(2)} Йоттабайт`
    }
    if (Math.trunc(byte / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024)) {
      return `${(byte / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(2)} Зеттабайт`
    }
    if (Math.trunc(byte / 1024 / 1024 / 1024 / 1024 / 1024 / 1024)) {
      return `${(byte / 1024 / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(2)} Эксабайт`
    }
    if (Math.trunc(byte / 1024 / 1024 / 1024 / 1024 / 1024)) {
      return `${(byte / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(2)} Петабайт`
    }
    if (Math.trunc(byte / 1024 / 1024 / 1024 / 1024)) {
      return `${(byte / 1024 / 1024 / 1024 / 1024).toFixed(2)} Терабайт`
    }
    if (Math.trunc(byte / 1024 / 1024 / 1024)) {
      return `${(byte / 1024 / 1024 / 1024).toFixed(2)} Гигабайт`
    }
    if (Math.trunc(byte / 1024 / 1024)) {
      return `${(byte / 1024 / 1024).toFixed(2)} Мегабит`
    }
    if (Math.trunc(byte / 1024)) {
      return `${(byte / 1024).toFixed(2)} Килобайт`
    }
    return `${byte} байт`;
  }

  const tableCellName = (row) => {
    if (row.Key === prefix) {
      return (
        <Button variant="text" sx={{ textTransform: 'none' }} startIcon={<FolderIcon />} onClick={(e) => {updateFiles('');}}>
            ...
        </Button>
      )
    }
    if (row.Folder) {
      return (
        <Button variant="text" sx={{ textTransform: 'none' }} value={row.Key} startIcon={<FolderIcon />} onClick={(e) => {updateFiles(e.target.value);}}>
            {prefix ? row.Key.slice(0, -1).split(prefix)[1] : row.Key.slice(0, -1)}
        </Button>
      )
    }
    return (
      <Button variant="text" sx={{ textTransform: 'none' }} startIcon={<DescriptionIcon />}>
          {prefix ? row.Key.split(prefix)[1] : row.Key}
      </Button>
    )
  }

  const updateFiles = async (prefix) => {
    const pathCount = await prefix.split('/').length;
    let data = await getList(prefix);
    let result = [];
    data.forEach((e) => {
      let split = e.Key.split('/');
      if (split.length === pathCount || (split.length === pathCount + 1 && split[pathCount] === '')) {
        result.push({
          Key: e.Key,
          Size: e.Size,
          Folder: split[pathCount] === ''
        });
      }
    });
    setFiles(await result);
    setPrefix(prefix);
  }

  useEffect(() => {
    updateFiles('');
  }, []);

  return (
    <>
    <MenuFileList openModalFile={() => setOpen(true)}/>
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <UploadFile prefix={prefix} closeModal={() => {setOpen(false); updateFiles(prefix);}} />
      </Box>
    </Modal>

    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Наименование</TableCell>
          <TableCell align="right">Размер</TableCell>
          <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((row) => (
            <TableRow
              key={row.Key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{tableCellName(row)}</TableCell>
              <TableCell align="right">
              {row.Key !== prefix ? convertSize(row.Size) : ""}
              </TableCell>
              <TableCell align="right">
                {row.Key !== prefix ?
                <>
                  <Button variant="text" startIcon={<DownloadIcon />} value={`/${row.Key}`} onClick={(e) => {downloadFile({Key: e.currentTarget.value}).then(updateFiles(prefix))}} />
                  <Button variant="text" startIcon={<DeleteIcon />} value={`/${row.Key}`} onClick={(e) => {deleteFile({Key: e.currentTarget.value}).then(updateFiles(prefix))}} />
                </>
                : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
      </>
  );
}