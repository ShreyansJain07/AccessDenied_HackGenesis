import React, { useState,useEffect,useContext } from "react";
import { Modal } from "antd";
import { IoIosDocument } from "react-icons/io";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { addApplicantProfile } from "../userFirestore";
import { UserContext } from "../App";


function AiresumeParser() {
  const [resumes,setResumes] = useState([])
  const [bestSearch, setBestSearch] = useState([]);
  const [input, setInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getBackgroundColor = () => {
    const colors = ['#FF8A65', '#FFB74D', '#FFD54F', '#FFF176', '#DCE775', '#69F0AE', '#00E676', '#4DB6AC', '#80DEEA', '#4FC3F7'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const deleteResume = (id) => {
    const updatedResumes = resumes.filter(resume => resume.id !== id);
    setResumes(updatedResumes);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const db = getFirestore();
        const jobsCollection = await getDocs(collection(db, "resume"));
        const jobsData = jobsCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(jobsData);
        setResumes(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);
  
  const getMatchScoreColor = (matchScore) => {
    if (matchScore >= 80) {
      return 'green';
    } else if (matchScore >= 60) {
      return '#CCCC00';
    } else {
      return 'red';
    }
  };

  
  const handleGenerate = async () => {
    console.log("pressed");
    const resumeText = resumes
    .map((resume) => `name:${resume.name},description:${resume.desc}`)
    .join("\n\n");
    const response = await fetch("https://api.edenai.run/v2/text/generation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZWY4ZmI2YjctMzczOC00NWNjLWJhNjUtYjYxZDkxMGRkZDIzIiwidHlwZSI6ImFwaV90b2tlbiJ9.7_2wj3ZqUpcUfxXJHg5viceJPYmVWHmprqEvxByLBEw",
      },
      body: JSON.stringify({
        providers: "openai",
        text: `Generate a rank of resumes that has most keyword for ${input} and best suited with with keywords ${input}, and resumes are'${resumeText}'. The output should be in a well-structured JSON format.With only keywords present in description should be in skills. Here's an example of the expected output:
        [
          {
            "name": "Name of the person in resume",
            "skills": ["React","futter",etc"] // only add skills matching the input and in description,
            "matchScore":"" // generate a matchscore integer between 0-100 , the score depends upon how much resumes description of a particular person matches with keywords of input
          },
          {
            "name": "Name of the person in resume",
            "skills": ["python","django",etc] // only add skills matching the input and in description,
            "matchScore":""
          }
        ]
        
        Give the output according to the rank(Most skills match algorithm first) the best resume according to the keywords '${input}' with the main topic (resume name) and relevant skills from the desc .`,
        temperature: 0.2,
        max_tokens: 500,
        fallback_providers: "",
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data.openai.generated_text);
    const parsedData = JSON.parse(data.openai.generated_text);
    setIsModalOpen(true);
    setBestSearch(parsedData);
  };


  const handleClick = () => {
    const rating = "4.7";
    const resume = "Looking for a mentor who is expirienced in mern stack."
    const rolePlay="Beginner"
    console.log(user.uid,
      user.name,
      rolePlay,
      rating,
      resume,);
    addApplicantProfile(
      user.uid,
      user.name,
      rolePlay,
      rating,
      resume,
    );
    alert("Your application has been submitted successfully");
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <header className="p-4">
          <div className="flex items-center space-x-4 justify-between">
            <div className="flex items-center space-x-2" href="#">
            <IoIosDocument className="text-blue-500" size={28} />
              <span className="text-lg font-bold text-blue-500" style={{fontSize:"26px"}}>AI Resume Parser</span>
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col p-4 gap-4 md:p-6">
          <div className="border rounded-lg p-4 grid gap-4 bg-gray-100">
            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-gray-500 dark:text-gray-400"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <h1 className="text-lg font-semibold tracking-wider">
                Search for Best Resumes
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter keywords to search for best resumes..."
                type="search"
              />
              <button
                onClick={handleGenerate}
                className="bg-slate-700 hover:bg-slate-500 text-white inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  text-primary-foreground hover:/90 h-9 rounded-md px-3"
              >
                Search
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {resumes &&
              resumes.map((resume,id) => (
                <div key={id} className="border rounded-lg p-4 grid gap-4 bg-gray-100">
                  <div className="flex items-center gap-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6 text-gray-500 dark:text-gray-400"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    <h1 className="text-lg font-semibold tracking-wider">
                      {resume.name}
                    </h1>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={handleClick} className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  text-primary-foreground hover:/90 h-9 rounded-md px-3">
                      Connect
                    </button>
                    <button onClick={() => deleteResume(resume.id)} className="text-red-400 hover:text-red-400 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  text-primary-foreground hover:/90 h-9 rounded-md px-3">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </main>
      </div>
      <Modal
        title="Best Results"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {bestSearch && (
          <div>
            {bestSearch.map((resume,id) => (
              <div key={resume.name} style={{ marginBottom: "20px" }}>
                <div style={{ fontWeight: "bold",fontSize:"20px"}}>{id+1}. {resume.name}</div>
                <div>
                  {resume.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        display: "inline-block",
                        backgroundColor: getBackgroundColor(resume.matchScore),
                        padding: "5px 10px",
                        borderRadius: "20px",
                        marginRight: "10px",
                        marginBottom: "10px",
                        color:"black",
                        margin:"15px 4px",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div>
                  <span style={{ fontWeight: "bold",fontSize:"17px" }}>Match Score: </span>
                  <span
                    style={{ color: getMatchScoreColor(resume.matchScore), fontWeight: "bold",fontSize:"17px" }}
                  >
                    {resume.matchScore}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
}

export default AiresumeParser;
