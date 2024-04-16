import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Input,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  Select,
  Divider,
  ButtonGroup,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getDoc } from "firebase/firestore";
import { setDoc, deleteDoc } from "firebase/firestore";
import {
  getFirestore,
  doc,
  getDocs,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { addJobs, addResume } from "../userFirestore";
import { UserContext } from "../App";

const VirtualAssistant = () => {
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  const [Applicants, setApplicants] = useState([
    { name: "Rishab", skills: "Front-End Dev" },
    { name: "Shreyans", skills: "Front-End Dev" },
  ]);
  const [Interviewers, setInterviewers] = useState([]);
  const [Offered, setOffered] = useState([]);

  // Modal
  const [meetings, setMeetings] = useState([]);
  const {
    isOpen: isMeetModalOpen,
    onOpen: onMeetModalOpen,
    onClose: onMeetModalClose,
  } = useDisclosure();

  const [newMeeting, setNewMeeting] = useState({
    companyName: "", // New field
    disability: "", // New field
    experience: "", // New field
    posted: "", // New field
    rating: "", // New field
    role: "", // New field
    salary: "", // New field
  });

  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     try {
  //       const db = getFirestore();
  //       const applicantsCollection = await getDocs(
  //         collection(db, "applicants")
  //       );
  //       const applicantsData = applicantsCollection.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setApplicants(applicantsData);
  //       const jobsCollection = await getDocs(collection(db, "jobs"));
  //       const jobsData = jobsCollection.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       console.log(jobsData);
  //       setMeetings(jobsData);

  //     } catch (error) {
  //       console.error("Error fetching jobs:", error);
  //     }
  //   };

  //   fetchJobs();
  // }, []);

  // const acceptApplicant = async (uid) => {
  //   console.log(uid);
  //   const db = getFirestore();
  //   const userDocRef = doc(db, "applicants", uid);
  //   let data = [];
  //   try {
  //     const userDocSnapshot = await getDoc(userDocRef);
  //     if (userDocSnapshot.exists()) {
  //       data = [...data, userDocSnapshot.data()];
  //       console.log(data);
  //       setInterviewers(data);
  //     } else {
  //       console.error("User data not found in Firestore");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const db = getFirestore();

        // Fetch applicants data
        const applicantsCollection = await getDocs(
          collection(db, "applicants")
        );
        const applicantsData = applicantsCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApplicants(applicantsData);

        // Fetch jobs data
        const jobsCollection = await getDocs(collection(db, "jobs"));
        const jobsData = jobsCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(jobsData);
        setMeetings(jobsData);

        // Fetch data from the "interview" collection
        const interviewCollection = await getDocs(collection(db, "interview"));
        const interviewData = interviewCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInterviewers(interviewData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchJobs();
  }, []);

  const acceptApplicant = async (uid) => {
    console.log(uid);
    const db = getFirestore();
    const applicantsDocRef = doc(db, "applicants", uid);
    const interviewersCollection = collection(db, "interview");

    try {
      const applicantsDocSnapshot = await getDoc(applicantsDocRef);

      if (applicantsDocSnapshot.exists()) {
        const applicantData = applicantsDocSnapshot.data();
        const interviewData = {
          ...applicantData,
          Company: user ? user.name : null,
        };
        await setDoc(doc(interviewersCollection, uid), interviewData);
        await deleteDoc(applicantsDocRef);
        const interviewsCollectionData = await getDocs(interviewersCollection);
        const interviewsData = interviewsCollectionData.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setInterviewers(interviewsData);
      } else {
        console.error("User data not found in Firestore");
      }
    } catch (error) {
      console.error("Error handling the applicant:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeeting((prevMeeting) => ({
      ...prevMeeting,
      [name]: value,
    }));
  };
  const handleAddMeeting = () => {
    setMeetings((prevMeetings) => [...prevMeetings, newMeeting]);

    addJobs(
      user.uid,
      newMeeting.companyName,
      newMeeting.disability,
      newMeeting.experience,
      serverTimestamp(),
      newMeeting.rating,
      newMeeting.role,
      newMeeting.salary
    );

    onMeetModalClose();
  };
  const handleClick = () => {
    addResume(user.uid, "hello thi is desc", "Shreyans");
  };
  const [resumes, setResumes] = useState([]);
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload_photo", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to recognize person");
      }

      const originalFileName = file.name;
      const fileExists = resumes.some(
        (resume) => resume.name === originalFileName
      );
      const data = await response.json();
      if (!fileExists) {
        const newResumes = [
          ...resumes,
          { name: originalFileName, id: resumes.length + 1, desc: data.data },
        ];
        setResumes(newResumes);
        addResume(user.uid, data.data , originalFileName);
      }

      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ backgroundColor: "#f3f4f6", paddingBottom: "2rem" }}>
      {/* <hr /> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          Application Manager
        </div>
        <div style={{display:"flex",gap:"10px"}}>
          <Button
            variant="outline"
            boxShadow="xl"
            transition="transform 0.2s" // Add a smooth transition effect
            _hover={{ transform: "scale(1.05)" }}
            style={{
              fontSize: "0.7rem",
              padding: "0.5rem",
              paddingTop: "0",
              paddingBottom: "0",
            }}
            color="#2234da"
            onClick={onMeetModalOpen}
          >
            +
          </Button>
          <Button
            variant="outline"
            boxShadow="xl"
            transition="transform 0.2s" // Add a smooth transition effect
            _hover={{ transform: "scale(1.05)" }}
            style={{
              fontSize: "0.7rem",
              padding: "0.5rem",
              paddingTop: "0",
              paddingBottom: "0",
            }}
            color="#2234da"
          >
            Meeting in 15 mins
          </Button>
          <div>
            <label
              htmlFor="upload"
              style={{
                backgroundColor: "#2563EB",
                color: "#FFFFFF",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                whiteSpace: "nowrap",
                fontSize: "0.875rem",
                fontWeight: "medium",
                padding: "0.5rem",
                borderRadius: "0.375rem",
                transition: "background-color 0.3s, color 0.3s",
                outline: "none",
                border: "none",
                marginRight: "0.5rem",
              }}
            >
              Upload Resume
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleImageUpload(event.target.files[0])}
              id="upload"
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
      {/* // */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "1rem",
        }}
      >
        {meetings.map((meeting) => {
          return (
            <Card
              overflow="hidden"
              width="400px"
              variant="outline"
              boxShadow="xl"
              transition="transform 0.3s" // Add a smooth transition effect
              _hover={{ transform: "scale(1.02)" }}
              style={{
                marginTop: "1rem",
                padding: "1rem",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  padding: "0.5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 625,
                    }}
                  >
                    {meeting.Role}
                  </div>
                  <div
                    style={{
                      backgroundColor: "#2234da",
                      color: "white",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontWeight: "520",
                      paddingLeft: "1.25rem",
                      paddingRight: "1.25rem",
                      paddingTop: "0.25rem",
                      paddingBottom: "0.25rem",
                      fontSize: "0.7rem",
                      borderRadius: "1rem",
                    }}
                  >
                    <div>{meeting.Disability}</div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "0.9rem",
                    fontWeight: "520",
                  }}
                >
                  <div>Experience: {meeting.Experience} years</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "0.9rem",
                    fontWeight: "520",
                  }}
                >
                  <div>Speciality: {meeting.Disability} </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontWeight: "520",
                  }}
                >
                  <div>{meeting.posted}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontWeight: "520",
                  }}
                >
                  <div>Rating: {meeting.Rating}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontWeight: "520",
                  }}
                >
                  <div>Role: {meeting.Role}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontWeight: "520",
                  }}
                >
                  <div>Company: {meeting.Salary} </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      {/* // */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "0.5rem",
          padding: "1rem",
        }}
      >
        <div
          style={{
            width: "fit-content",
            fontWeight: "bold",
            flex: "1",
            textAlign: "left",
          }}
        >
          Total Candidates: 20
        </div>
        <InputGroup style={{ flex: "1" }} boxShadow="xl">
          <InputLeftElement pointerEvents="none">
            <CiSearch />
          </InputLeftElement>
          <Input
            type="tel"
            style={{ backgroundColor: "white", fontSize: "0.7rem" }}
            placeholder="Search by name or keyword"
          />
        </InputGroup>
      </div>
      <hr />
      <div style={{ display: "flex", marginTop: "1rem", flexDirection: "row" }}>
        <div style={{ flex: 1 }}>
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            style={{
              marginLeft: "1rem",
              marginRight: "1rem",
              borderTop: "4px solid #2234da",
              flex: 1,
            }}
          >
            <CardBody
              style={{
                textAlign: "left",
                marginTop: "-0.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>Applied For Mentorship</div>
                <div
                  style={{
                    marginLeft: "auto",
                    width: "fit-content",
                    backgroundColor: "lightskyblue",
                    paddingLeft: "0.2rem",
                    paddingRight: "0.2rem",
                    borderRadius: "0.2rem",
                  }}
                >
                  0{Applicants.length}
                </div>
              </div>
            </CardBody>
          </Card>
          {Applicants?.map((candidate) => {
            return (
              <div style={{ padding: "1rem", paddingBottom: "0" }}>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  boxShadow="xl"
                  transition="transform 0.2s" // Add a smooth transition effect
                  _hover={{ transform: "scale(1.05)" }}
                  variant="outline"
                >
                  <Stack>
                    <CardBody style={{ textAlign: "left" }}>
                      <Heading size="md">{candidate?.Name}</Heading>
                      <Text py="2">{candidate.Resume}</Text>
                      <Text pb="2">Disability: {candidate.Disability}</Text>
                      <Text pb="2">Skills: {candidate?.Role}</Text>
                      <hr />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingTop: "0.5rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "left",
                            gap: "0.5rem",
                          }}
                        >
                          <div>
                            Experience : {candidate.WorkExperience} years
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: "0.25rem",
                            }}
                          >
                            <FaRegStar />
                            {candidate.Rating}
                          </div>
                        </div>
                        <div
                          onClick={() => acceptApplicant(candidate.uid)}
                          style={{
                            color: "green",
                            textDecoration: "underline",
                          }}
                        >
                          Accept
                        </div>
                      </div>
                    </CardBody>
                  </Stack>
                </Card>
              </div>
            );
          })}
        </div>
        <div style={{ flex: 1 }}>
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            style={{
              marginLeft: "1rem",
              marginRight: "1rem",
              borderTop: "4px solid #ff5045",
              flex: 1,
            }}
          >
            <CardBody
              style={{
                textAlign: "left",
                marginTop: "-0.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>Mentees Queued</div>
                <div
                  style={{
                    marginLeft: "auto",
                    width: "fit-content",
                    backgroundColor: "orange",
                    paddingLeft: "0.2rem",
                    paddingRight: "0.2rem",
                    borderRadius: "0.2rem",
                  }}
                >
                  0{Interviewers.length}
                </div>
              </div>
            </CardBody>
          </Card>
          {Interviewers?.map((candidate) => {
            return (
              <div style={{ padding: "1rem", paddingBottom: "0" }}>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  boxShadow="xl"
                  transition="transform 0.2s" // Add a smooth transition effect
                  _hover={{ transform: "scale(1.05)" }}
                  variant="outline"
                >
                  <Stack>
                    <CardBody style={{ textAlign: "left" }}>
                      <Heading size="md">{candidate?.Name}</Heading>
                      <Text py="2">{candidate.Resume}</Text>
                      <Text pb="2">Disability: {candidate.Disability}</Text>
                      <Text pb="2">Skills: {candidate.Role}</Text>
                      <hr />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingTop: "0.5rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "left",
                            gap: "0.5rem",
                          }}
                        >
                          <div>Expirience : {candidate.Experience}</div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: "0.25rem",
                            }}
                          >
                            <FaRegStar />
                            {candidate.Rating}
                          </div>
                        </div>
                        <div
                          style={{
                            color: "green",
                            textDecoration: "underline",
                          }}
                        >
                          <a href="https://ritojnan.github.io/streamworks/">
                            Meet
                          </a>
                        </div>
                      </div>
                    </CardBody>
                  </Stack>
                </Card>
              </div>
            );
          })}
        </div>
        <div style={{ flex: 1 }}>
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            style={{
              marginLeft: "1rem",
              marginRight: "1rem",
              borderTop: "4px solid yellow",
              flex: 1,
            }}
          >
            <CardBody
              style={{
                textAlign: "left",
                marginTop: "-0.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>Sessions</div>
                <div
                  style={{
                    marginLeft: "auto",
                    width: "fit-content",
                    backgroundColor: "lightyellow",
                    paddingLeft: "0.2rem",
                    paddingRight: "0.2rem",
                    borderRadius: "0.2rem",
                  }}
                >
                  0
                </div>
              </div>
            </CardBody>
          </Card>
          {Offered?.map((candidate) => {
            return (
              <div style={{ padding: "1rem", paddingBottom: "0" }}>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                  boxShadow="xl"
                  transition="transform 0.2s" // Add a smooth transition effect
                  _hover={{ transform: "scale(1.05)" }}
                >
                  <Stack>
                    <CardBody style={{ textAlign: "left" }}>
                      <Heading size="md">{candidate?.name}</Heading>
                      <Text py="2">
                        As a dedicated front-end developer, I bring a wealth of
                        expertise in crafting seamless and visually captivating
                        user experiences. Proficient in the core technologies of
                        front-end development, I excel in translating design
                        concepts into responsive and interactive web interfaces.
                      </Text>
                      <Text pb="2">Speaks: English, Hindi</Text>
                      <Text pb="2">Skills: {candidate?.skills}</Text>
                      <hr />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingTop: "0.5rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "left",
                            gap: "0.5rem",
                          }}
                        >
                          <div>Rs 800/hr</div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: "0.25rem",
                            }}
                          >
                            <FaRegStar />
                            4.5
                          </div>
                        </div>
                        <div style={{ color: "gray" }}>4 days ago</div>
                      </div>
                    </CardBody>
                  </Stack>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
      <Modal isOpen={isMeetModalOpen} onClose={onMeetModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel style={{ paddingTop: "0.4rem" }}>Mentor Name</FormLabel>
            <Input
              type="tel"
              name="companyName"
              value={newMeeting.companyName}
              onChange={handleInputChange}
              placeholder="Mentor Name"
            />
            <FormLabel style={{ paddingTop: "0.4rem" }}>Speciality</FormLabel>
            <Input
              type="tel"
              name="disability"
              value={newMeeting.disability}
              onChange={handleInputChange}
              placeholder="Speciality"
            />
            <FormLabel style={{ paddingTop: "0.4rem" }}>Experience</FormLabel>
            <Input
              type="tel"
              name="experience"
              value={newMeeting.experience}
              onChange={handleInputChange}
              placeholder="Experience"
            />
            <FormLabel style={{ paddingTop: "0.4rem" }}>Posted</FormLabel>
            <Input
              type="tel"
              name="posted"
              value={newMeeting.posted}
              onChange={handleInputChange}
              placeholder="Posted"
            />
            <FormLabel style={{ paddingTop: "0.4rem" }}>Rating</FormLabel>
            <Input
              type="tel"
              name="rating"
              value={newMeeting.rating}
              onChange={handleInputChange}
              placeholder="Rating"
            />
            <FormLabel style={{ paddingTop: "0.4rem" }}>Role</FormLabel>
            <Input
              type="tel"
              name="role"
              value={newMeeting.role}
              onChange={handleInputChange}
              placeholder="Role"
            />
            <FormLabel style={{ paddingTop: "0.4rem" }}>Company Name</FormLabel>
            <Input
              type="tel"
              name="salary"
              value={newMeeting.salary}
              onChange={handleInputChange}
              placeholder="Company Name"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              style={{
                backgroundColor: "#ff5045",
                color: "white",
                margin: "auto",
              }}
              onClick={handleAddMeeting}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default VirtualAssistant;
