import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import { useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import { update } from "../@types/types";
import { AuthContext } from "../contexts/AuthContext";


const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [user, setUser] = useState<typeof auth.currentUser>(null);
    const [loading, setLoading] = useState<boolean>(true);
    
    const login = (email: string, password: string) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    
    const googleLogin = () => {
        const googleProvider = new GoogleAuthProvider();
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const register = (email: string, password: string) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    
    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }

    const update = (name: string | null, photo?: string | null) => {
        const info = {} as update;
        if(name) info.displayName = name;
        if(photo) info.photoURL = photo;
        
        // return updateProfile(auth.currentUser, {
        //     displayName: name,
        //     photoURL: photo
        //   });

        return updateProfile(auth.currentUser!, info);
    }

    useEffect( () => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })

        return () => unSubscribe();
    } , [])

    const authInfo = {
        login,
        register,
        logout,
        user,
        loading,
        update,
        googleLogin
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;