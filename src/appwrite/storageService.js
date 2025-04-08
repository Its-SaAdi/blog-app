import conf from "../conf/conf";
import { Client, Storage, ID } from "appwrite";

export class StorageService {
    client = new Client();
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);
        
        this.bucket = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            const createdFile = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
            return createdFile;
        } catch (error) {
            console.log("Appwrite service :: uploadFile error: ", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            const deletedFile = await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile error: ", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        try {
            const image = this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId,
            )
            return image;
        } catch (error) {
            console.log("Appwrite service :: getFilePreview error: ", error);
        }
    }

    getFileView(fileId) {
        try {
            const image = this.bucket.getFileView(
                conf.appwriteBucketId,
                fileId,
            )
            return image;
        } catch (error) {
            console.log("Appwrite service :: getFileView error: ", error);
        }
    }
}

const storageService = new StorageService();
export default storageService;