import { UserCredential } from "firebase/auth";
import auth from "../firebase/firebase.config";

export interface update {
    displayName: string | null;
    photoURL: string | null;
};

export interface AuthContextType {
    login: (email: string, password: string) => Promise<UserCredential>;
    register: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    user: typeof auth.currentUser | null;
    loading: boolean;
    update: (name: string | null, photo?: string | null) => Promise<void>;
    googleLogin: () => Promise<UserCredential>;
}