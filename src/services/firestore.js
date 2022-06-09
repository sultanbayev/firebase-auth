import { doc, collection, addDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const projectsRef = collection(db, "projects");

export const createProject = (project) => {
    return addDoc(projectsRef, project);
}

export const getProject = (projectId) => {
    const docRef =  doc(db, "projects", projectId);
    return getDoc(docRef);
}