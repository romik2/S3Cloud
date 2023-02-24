import {useState} from "react";
import { Dropzone, FileItem } from "@dropzone-ui/react";
import { uploadFile } from '../utils/s3.js';

export default function UploadFile({prefix, closeModal}) {
    const [files, setFiles] = useState([]);

    const updateFiles = (incommingFiles) => {
        setFiles(incommingFiles);
        uploadFiles(incommingFiles);
    };

    const uploadFiles = async (files) => {
        await files.forEach(file => {
            uploadFile({Body: file.file, Key: `${prefix}${file.file.name}`});
        });
        setFiles([]);
        await closeModal();
    }

    return (
        <Dropzone onChange={updateFiles} view="grid" value={files}>
        {files.map((file) => (
            <div key={file.name}>
                <FileItem {...file} preview />
            </div>
        ))}
        </Dropzone>
    );
}