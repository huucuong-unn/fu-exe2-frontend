import React, { useState, useEffect } from 'react';
import { useCallback } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone';
import AccountAPI from '~/API/AccountAPI';

export default function UserProfilesTest() {
    const [userProfiles, setUserProfiles] = useState([]);
    const [image, setImage] = useState('');

    const fetchAccount = async () => {
        try {
            const account = await AccountAPI.findAccountById('ebf9b694-8eca-4ce7-9eca-85f58a2160ce');
            setUserProfiles(account);
            console.log(account);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAccount();
    }, []);
    function MyDropzone() {
        const onDrop = useCallback(async (acceptedFiles) => {
            const file = acceptedFiles[0];
            const formData = new FormData();
            formData.append('file', file);
            console.log(file);
            const a = await AccountAPI.uploadImage(userProfiles.id, formData);

            console.log(file);
        }, []);
        const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

        return (
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>Drag 'n' drop some files here, or click to select files</p>
                )}
            </div>
        );
    }
    return (
        <div>
            <MyDropzone></MyDropzone>
            <img src={'https://tortee-image-upload.s3.ap-southeast-1.amazonaws.com/' + userProfiles.avatarUrl}></img>
            <h1>{userProfiles.username}</h1>
        </div>
    );
}
