import React, { useState } from "react";
// import poppins from './poppins.otf'

import { RiArrowUpSLine } from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";
import arrow from "../assests/Vector4.svg";
import vector2 from "../assests/Vector3.svg";
import Testimonials from "../screens/Testimonials";
import Description from "../components/Description";
import Hero from "../components/Hero";

export default function LandingTop() {
  const [click1, Setclick1] = useState(false);
  const [click2, Setclick2] = useState(false);
  const [click3, Setclick3] = useState(false);
  const [click4, Setclick4] = useState(false);
  return (
    <>
      <Hero />
      <div className="description-container" style={{ position: "relative" }}>
        <Description />
      </div>
      <Testimonials />
      <div
        className="section1"
        id="s2"
        style={{
          marginTop: "0",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="section-title">Frequently Asked Questions !</div>
        <img
          src={arrow}
          alt=""
          className="four"
          style={{
            position: "absolute",
            top: "30px",
            right: "-70px",
            opacity: "25%",
          }}
        />
        <img
          src={vector2}
          alt=""
          className="four"
          style={{
            position: "absolute",
            bottom: "30px",
            left: "100px",
            opacity: "25%",
          }}
        />

        <div
          className="questions"
          style={{ color: click1 ? "white" : "#ffffff" }}
        >
          <h5
            onClick={() => {
              Setclick1(!click1);
            }}
          >
            How do I find the right mentor for me?
            <span style={{ fontWeight: "bolder", fontSize: "4.5vh" }}>
              {click1 ? <RiArrowDownSLine /> : <RiArrowUpSLine />}
            </span>
          </h5>
          <p
            style={{
              opacity: click1 ? 0 : 1,
              height: click1 ? 0 : "auto",
              overflow: "hidden",
              fontFamily: "poppins",
              color: "#ffffffd",
              transition: "opacity 0.3s ease-in-out, height 0.3s ease-in-out",
            }}
          >
      Finding the right mentor starts with understanding your goals and interests. Our platform offers advanced search filters and matching algorithms that help pair you with mentors who share your aspirations and expertise. Simply create an account, complete your profile, and explore our diverse pool of mentors to find your perfect match.
          </p>
        </div>
        <span className="dots" style={{ color: "#ffffffd" }}>
          ....................................................................................................................................................
        </span>
        <div
          className="questions"
          style={{ color: click2 ? "white" : "#ffffff" }}
        >
          <h5
            onClick={() => {
              Setclick2(!click2);
            }}
          >
What kind of support can I expect from my mentor?            <span
              style={{
                fontWeight: "bolder",
                fontSize: "4.5vh",
                marginLeft: "2vw",
              }}
            >
              {click2 ? <RiArrowDownSLine /> : <RiArrowUpSLine />}
            </span>
          </h5>
          <p
            style={{
              opacity: click2 ? 0 : 1,
              height: click2 ? 0 : "auto",
              overflow: "hidden",
              fontFamily: "poppins",
              color: "#ffffffd",
              transition: "opacity 0.3s ease-in-out, height 0.3s ease-in-out",
            }}
          >
      Our mentors provide personalized guidance and support tailored to your needs and objectives. Whether you're seeking career advice, professional development insights, or academic assistance, our mentors are here to offer valuable expertise, share experiences, and help you navigate your journey towards success.
          </p>
        </div>
        <span className="dots" style={{ color: "#ffffffd" }}>
          ....................................................................................................................................................
        </span>

        <div
          className="questions"
          style={{ color: click3 ? "white" : "#ffffff" }}
        >
          <h5
            onClick={() => {
              Setclick3(!click3);
            }}
          >
How often should I communicate with my mentor?            <span
              style={{
                fontWeight: "bolder",
                fontSize: "4.5vh",
                marginLeft: "2vw",
              }}
            >
              {click3 ? <RiArrowDownSLine /> : <RiArrowUpSLine />}
            </span>
          </h5>
          <p
            style={{
              opacity: click3 ? 0 : 1,
              height: click3 ? 0 : "auto",
              overflow: "hidden",
              color: "#ffffffd",
              fontFamily: "poppins",
              transition: "opacity 0.3s ease-in-out, height 0.3s ease-in-out",
            }}
          >
      The frequency of communication with your mentor depends on your goals and availability. Some mentees prefer regular check-ins, while others opt for periodic meetings based on their schedules. It's essential to establish clear communication expectations and maintain open dialogue to maximize the mentorship experience.
          </p>
        </div>
        <span className="dots" style={{ color: "#ffffffd" }}>
          ....................................................................................................................................................
        </span>

        <div
          className="questions"
          style={{ color: click4 ? "white" : "#ffffff" }}
        >
          <h5
            onClick={() => {
              Setclick4(!click4);
            }}
          >
What if I'm not satisfied with my mentor?            <span
              style={{
                fontWeight: "bolder",
                fontSize: "4.5vh",
                marginLeft: "2vw",
              }}
            >
              {click4 ? <RiArrowDownSLine /> : <RiArrowUpSLine />}
            </span>
          </h5>
          <p
            style={{
              opacity: click4 ? 0 : 1,
              height: click4 ? 0 : "auto",
              color: "#ffffffd",
              overflow: "hidden",
              fontFamily: "poppins",
              transition: "opacity 0.3s ease-in-out, height 0.3s ease-in-out",
            }}
          >
      If you're not satisfied with your mentorship experience, you have the flexibility to request a new mentor or explore other options available on our platform. We prioritize your satisfaction and strive to ensure that you receive the support and guidance you need to achieve your goals.
          </p>
        </div>
        
        <span className="dots" style={{ color: "#ffffffd" }}>
          ....................................................................................................................................................
        </span>

        <div
          className="questions"
          style={{ color: click4 ? "white" : "#ffffff" }}
        >
          <h5
            onClick={() => {
              Setclick4(!click4);
            }}
          >
Is mentorship free on your platform?            <span
              style={{
                fontWeight: "bolder",
                fontSize: "4.5vh",
                marginLeft: "2vw",
              }}
            >
              {click4 ? <RiArrowDownSLine /> : <RiArrowUpSLine />}
            </span>
          </h5>
          <p
            style={{
              opacity: click4 ? 0 : 1,
              height: click4 ? 0 : "auto",
              color: "#ffffffd",
              overflow: "hidden",
              fontFamily: "poppins",
              transition: "opacity 0.3s ease-in-out, height 0.3s ease-in-out",
            }}
          >
      Yes, mentorship is free on our platform. We believe in democratizing access to mentorship opportunities and empowering individuals to pursue their aspirations without financial barriers. However, please note that some mentors may offer additional premium services or programs outside of the free mentorship provided.
          </p>
        </div>
      </div>
    </>
  );
}
