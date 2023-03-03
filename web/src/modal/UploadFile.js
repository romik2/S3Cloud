import {useState} from "react";
import { Dropzone, FileItem } from "@dropzone-ui/react";
import { uploadFile } from '../utils/s3.js';

export default function UploadFile({prefix, closeModal, updateUploadFile, updatedFiles}) {
    const [files, setFiles] = useState([]);

    const updateFiles = (incommingFiles) => {
        setFiles(incommingFiles);
        uploadFiles(incommingFiles);
    };

    const uploadFiles = (files) => {
        updateUploadFile(files);
        let errorFiles = [];
        files.forEach(async (file, key) => {
            try {
                const data = await uploadFile({Body: file.file, Key: `${prefix}${file.file.name}`});
                console.log(files);
                if (data.$metadata.httpStatusCode === 200) {
                    files.splice(key, 1);
                    setFiles(files);
                } else {
                    console.log(1);
                    files.splice(key, 1);
                    setFiles(files);
                    errorFiles.push(file);
                }
                if (files.length === 0) {
                    updatedFiles();
                    console.log(errorFiles, "error");
                    if (errorFiles.length !== 0) {
                        uploadFiles(errorFiles);
                    }
                }
            } catch (ex) {
                files.splice(key, 1);
                setFiles(files);
                errorFiles.push(file);
            }
            
        });
        closeModal();  
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