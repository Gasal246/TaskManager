import * as ftp from 'basic-ftp';
import * as path from 'path';
import fetch from 'node-fetch'; // Ensure to install node-fetch or use a similar library

interface UploadOptions {
    userId: string;
    fileType: "profile-images" | "user-docs" | "company-docs";
    fileName: string;
}

async function uploadBlobToFtp(blobUrl: string, options: UploadOptions): Promise<string | null> {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    const remoteFilePath = `/${options.fileType}/${options.userId}/${options.fileName}`;

    try {
        // Fetch the blob content
        const response = await fetch(blobUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch blob: ${response.statusText}`);
        }
        const blobBuffer = await response.buffer(); // Get blob as a buffer

        // Connect to the FTP server
        await client.access({
            host: process.env.FTP_SERVER,
            port: Number(process.env.FTP_PORT),
            user: process.env.FTP_USER,
            password: 'Wideline@123#',
            secure: false
        });

        // Ensure the directory exists
        const remoteDir = path.dirname(remoteFilePath);
        await client.ensureDir(remoteDir);

        // Upload the blob content
        await client.uploadFrom(Buffer.from(blobBuffer) as any, remoteFilePath);

        const fileUrl = `http://${process.env.FTP_SERVER}/${remoteFilePath}`;

        console.log("File Uploaded Successfully.");
        console.log("File Url: ", fileUrl);

        return fileUrl;
    } catch (error) {
        console.log("Failed to upload file: ", error);
        return null;
    } finally {
        client.close();
    }
}

export default uploadBlobToFtp;
