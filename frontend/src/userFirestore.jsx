import { app } from "./Firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export const firestore = getFirestore(app);

export const addUserToFirestore = async (user, role) => {
  const userRef = doc(firestore, "users", user.uid);
  await setDoc(userRef, {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photo: user.photoURL,
    role,
  });
};

export const updateUserProfile = async (
  uid,
  gender,
  bloodGrp,
  role,
  workExperience,
  disability
) => {
  const userRef = doc(firestore, "users", uid);

  await setDoc(
    userRef,
    {
      gender,
      BloodGrp: bloodGrp,
      Role: role,
      WorkExperience: workExperience,
      disability,
    },
    { merge: true }
  );
};

export const addApplicantProfile = async (
  uid,
  Name,
  Role,
  Rating,
  Resume,
) => {
  const applicantRef = doc(firestore, "applicants", uid);
  await setDoc(applicantRef, {
    uid,
    Name,
    Role,
    Rating,
    Resume,
  });
};

export const addJobs = async (
  uid,
  CompanyName,
  Disability,
  Experience,
  Posted,
  Rating,
  Role,
  Salary
) => {
  const jobsRef = doc(firestore, "jobs",uid);
  await setDoc(jobsRef, {
    uid,
    CompanyName,
    Disability,
    Experience,
    Posted,
    Rating,
    Role,
    Salary,
  });
};

export const addResume = async (uid, desc,name) => {
  const resumeRef = doc(firestore, "resume", uid);
  await setDoc(resumeRef, {
    desc,
    name
  });
}