import conf from '../conf/conf';
import { Client, Databases, Query } from 'appwrite';

export class DBService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);
        
        this.databases = new Databases(this.client);
    }

    async createPost({title, content, featuredImage, status, userId, slug}) {
        try {
            const document = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
            return document;
        } catch (error) {
            console.log("Appwrite service :: createPost error: ", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            const document = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
            return document;
        } catch (error) {
            console.log("Appwrite service :: updatePost error: ", error);
            
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost error: ", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            const document = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return document;
        } catch (error) {
            console.log("Appwrite service :: getPost error: ", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            const documents = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
            return documents;
        } catch (error) {
            console.log("Appwrite service :: getPosts error: ", error);
            return false;
        }
    }
}

const dbService = new DBService();
export default dbService;