import conf from '../conf/conf'
import { Client, Account, ID } from 'appwrite'

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                const loginSession = await this.login({email, password});
                return loginSession;
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log("Appwrite service :: createAccount error: ", error);
        }
    }

    async login({email, password}) {
        try {
            const loginSession = await this.account.createEmailPasswordSession(email, password);
            return loginSession;
        } catch (error) {
            console.log("Appwrite service :: login error: ", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const currentUser = await this.account.get();
            return currentUser;
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser error: ", error);
        }

        return null;
    }

    async logoutFromAll() {
        try {
            const logoutResult = await this.account.deleteSessions();
            console.log("Logout result ", logoutResult);
        } catch (error) {
            console.log("Appwrite service :: logoutFromAll error: ", error);   
        }
    }

    async logoutCurrentDevice() {
        try {
            const logoutResult = await this.account.deleteSession('current');
            return logoutResult;
        } catch (error) {
            console.log("Appwrite service :: logoutCurrentDevice error: ", error);
        }
    }
}

const authService = new AuthService();
export default authService;