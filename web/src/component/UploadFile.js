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
        await files.forEach(async (file) => {
            await uploadFile({Body: file.file, Key: `${prefix}${file.file.name}`});
        });
        await setFiles([]);
        await closeModal();
    }

    return (
        <Dropzone onChange={updateFiles} view="grid" maxFiles={5} maxFileSize={200000} value={files}>
        {files.map((file) => (
            <div key={file.file.name}>
                <FileItem {...file} preview />
            </div>
        ))}
        </Dropzone>
    );
}