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
    isStudent: boolean | null;
}

export interface RoomType {  
    _id: string;
    roomName: string;
    description: string;
    owner: string;
    members: string[];
}

export interface AssignmentType {  
    _id: string;
    title: string;
    description: string;
    createdBy: string;
    roomId: string;
}

export interface RoomAssignmentType extends RoomType {
    assignments: AssignmentType[];
}