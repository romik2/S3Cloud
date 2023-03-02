import {useState} from "react";
import { Dropzone, FileItem } from "@dropzone-ui/react";
import { uploadFile } from '../utils/s3.js';

export default function UploadFile({prefix, closeModal, updateUploadFile}) {
    const [files, setFiles] = useState([]);

    const updateFiles = (incommingFiles) => {
        setFiles(incommingFiles);
        uploadFiles(incommingFiles);
    };

    const uploadFiles = (files) => {
        let data = [];
        updateUploadFile(files);
        files.forEach(async (file, key) => {
            const data = await uploadFile({Body: file.file, Key: `${prefix}${file.file.name}`});
            if (data.$metadata.httpStatusCode === 200) {
                delete files[key];
                console.log(files);
            }
        });
        // setFiles([]);
        // closeModal();
    }

    return (
        <Dropzone onChange={updateFiles} view="grid" maxFiles={5} maxFileSize={200000} value={files}>
        {files.map((file, key) => (
            <div key={key}>
                <FileItem {...file} preview />
            </div>
        ))}
        </Dropzone>
    );
}