import * as ftp from 'basic-ftp';
import * as path from 'path';

interface UploadOptions {
    userId: string;
    fileType: "profile-images" | "user-docs" | "company-docs";
    fileName: string;
}

async function uploadToFtp(localFilePath: string, options: UploadOptions): Promise<string | null> {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    let remoteFilePath = `/${options.fileType}/${options.userId}/${options.fileName}`;

    try {
        await client.access({
            host: process.env.FTP_SERVER,
            port: Number(process.env.FTP_PORT),
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD,
            secure: false
        });

        const remoteDir = path.dirname(remoteFilePath); // Correct Path type DIR
        await client.ensureDir(remoteDir); // Ensure the existence of DIR

        await client.uploadFrom(localFilePath, remoteFilePath); // Upload file
        const fileUrl = `http://${process.env.FTP_SERVER}/${remoteFilePath}`;

        console.log("File Uploaded Successfully.");
        console.log("File Url: ", fileUrl);

        return fileUrl; // Returning Download Url.
    } catch (error) {
        console.log("Filed to upload File: ", error);
        return null;
    } finally {
        client.close(); // Close the connection
    }
}

export default uploadToFtp;
