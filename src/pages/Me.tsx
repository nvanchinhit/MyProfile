import React from "react";
import { Link } from "react-router-dom";
import { FaCode, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

const About = () => {
  return (
    <section
      id="about"
      style={{ 
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", 
        color: "white",
        paddingTop: "5%",
        paddingBottom: "5%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div className="container">
        {/* Card container */}
        <div 
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            overflow: "hidden",
            background: "rgba(30, 41, 59, 0.7)",
            backdropFilter: "blur(10px)",
            padding: "3rem",
            gap: "3rem",
            flexWrap: "wrap",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}
        >
          {/* Hình ảnh */}
          <div 
            style={{ 
              flex: "1 1 300px", 
              minWidth: "300px", 
              display: "flex", 
              justifyContent: "center",
              position: "relative"
            }}
          >
            {/* Background decoration */}
            <div style={{
              position: "absolute",
              width: "200px",
              height: "200px",
              background: "linear-gradient(45deg, #4361ee, #3a0ca3)",
              borderRadius: "50%",
              filter: "blur(60px)",
              opacity: "0.5",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(-10deg)",
              zIndex: "0"
            }}></div>

            {/* Image container with border animation */}
            <div style={{
              position: "relative",
              padding: "10px",
              borderRadius: "20px",
              zIndex: "1",
              background: "linear-gradient(145deg, rgba(67, 97, 238, 0.3), rgba(76, 201, 240, 0.1))",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)"
            }}>
              <img
                src="https://i.imgur.com/1r8SxLQ.jpeg"
                alt="About Me"
                style={{
                  width: "100%",
                  maxWidth: "350px",
                  height: "auto",
                  borderRadius: "12px",
                  display: "block",
                  transition: "transform 0.3s ease",
                }}
              />
            </div>
            
            {/* Experience badge */}
            <div
              style={{
                position: "absolute",
                bottom: "0",
                right: "5%",
                background: "linear-gradient(135deg, #4361ee, #3a0ca3)",
                color: "white",
                padding: "15px",
                borderRadius: "12px",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                minWidth: "120px",
                display: "flex",
                transform: "translateY(30%)",
                zIndex: "2",
                border: "2px solid rgba(255, 255, 255, 0.1)"
              }}
            >
              <div style={{ textAlign: "center", width: "100%" }}>
                <h3 style={{ fontSize: "22px", fontWeight: "bold", margin: "0" }}>
                  10+
                </h3>
                <p style={{ fontSize: "14px", margin: "5px 0 0 0", opacity: "0.8" }}>
                  Years Experience
                </p>
              </div>
            </div>
          </div>

          {/* Nội dung */}
          <div style={{ flex: "1 1 400px", minWidth: "300px" }}>
            <div style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              background: "rgba(67, 97, 238, 0.2)",
              padding: "8px 15px",
              borderRadius: "50px",
              marginBottom: "1rem"
            }}>
              <FaCode style={{ color: "#4361ee", marginRight: "8px" }} />
              <span style={{ fontSize: "14px", fontWeight: "500" }}>Web Developer</span>
            </div>
            
            <h2 style={{ 
              fontWeight: "bold", 
              fontSize: "2.2rem",
              marginBottom: "10px",
              background: "linear-gradient(90deg, #fff, #ddd)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent" 
            }}>
              Nguyễn Văn Chính
            </h2>
            
            <h3 style={{ marginBottom: "1.5rem", fontSize: "1.4rem", fontWeight: "500", color: "#e2e8f0" }}>
              A Front End <span style={{ 
                color: "#4cc9f0", 
                position: "relative",
                display: "inline-block" 
              }}>Web Developer
                <div style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  width: "100%",
                  height: "3px",
                  background: "linear-gradient(90deg, #4361ee, transparent)"
                }}></div>
              </span>
            </h3>
            
            <p style={{ 
              marginBottom: "1rem", 
              lineHeight: "1.8", 
              color: "#cbd5e1",
              fontSize: "1.05rem" 
            }}>
              I am a passionate web developer with over 5 years of experience in
              creating beautiful, functional, and user-friendly websites. My
              expertise spans across front-end, allowing me to build complete
              solutions from scratch.
            </p>
            
            <p style={{ 
              marginBottom: "1.5rem", 
              lineHeight: "1.8", 
              color: "#cbd5e1",
              fontSize: "1.05rem" 
            }}>
              I specialize in JavaScript, TypeScript, React, Node.js, and various
              database systems. I am constantly learning and adapting to new
              technologies to provide the best solutions for my clients.
            </p>

            {/* Thông tin liên hệ */}
            <div style={{ 
              background: "rgba(30, 41, 59, 0.5)", 
              padding: "20px", 
              borderRadius: "12px",
              marginBottom: "1.5rem",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
              <h4 style={{ 
                fontSize: "1.1rem", 
                marginBottom: "1rem",
                color: "#e2e8f0",
                display: "flex",
                alignItems: "center" 
              }}> 
                <span style={{
                  width: "8px",
                  height: "20px",
                  background: "#4361ee",
                  display: "inline-block",
                  marginRight: "10px",
                  borderRadius: "4px"
                }}></span> 
                Contact Information
              </h4>
              
              <ul style={{ listStyle: "none", padding: "0" }}>
                <li style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  marginBottom: "0.8rem",
                  transition: "transform 0.2s ease" 
                }}>
                  <div style={{ 
                    backgroundColor: "rgba(67, 97, 238, 0.2)", 
                    borderRadius: "50%", 
                    width: "36px", 
                    height: "36px", 
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "15px"
                  }}>
                    <FaEnvelope size={16} style={{ color: "#4cc9f0" }} />
                  </div>
                  <span style={{ color: "#cbd5e1" }}>chinhnvpd10204@gmail.com</span>
                </li>
                
                <li style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  marginBottom: "0.8rem",
                  transition: "transform 0.2s ease" 
                }}>
                  <div style={{ 
                    backgroundColor: "rgba(67, 97, 238, 0.2)", 
                    borderRadius: "50%", 
                    width: "36px", 
                    height: "36px", 
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "15px"
                  }}>
                    <FaPhoneAlt size={16} style={{ color: "#4cc9f0" }} />
                  </div>
                  <span style={{ color: "#cbd5e1" }}>+84 344 757 955</span>
                </li>
                
                <li style={{ 
                  display: "flex", 
                  alignItems: "center",
                  transition: "transform 0.2s ease" 
                }}>
                  <div style={{ 
                    backgroundColor: "rgba(67, 97, 238, 0.2)", 
                    borderRadius: "50%", 
                    width: "36px", 
                    height: "36px", 
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "15px"
                  }}>
                    <FaMapMarkerAlt size={16} style={{ color: "#4cc9f0" }} />
                  </div>
                  <span style={{ color: "#cbd5e1" }}>Sơn Lộc, Can Lộc, Hà Tĩnh</span>
                </li>
              </ul>
            </div>

            <Link 
              to="/contact" 
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "linear-gradient(to right, #4361ee, #4cc9f0)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: "600",
                boxShadow: "0 10px 20px rgba(67, 97, 238, 0.3)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                border: "none",
                outline: "none",
                cursor: "pointer"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 15px 25px rgba(67, 97, 238, 0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(67, 97, 238, 0.3)";
              }}
            >
              Contact Me
              <FaArrowRight size={14} style={{ marginLeft: "10px" }} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;