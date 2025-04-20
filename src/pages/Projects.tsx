import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProjectDetail } from '../services/api';
import api from '../services/api';
import { FaCode, FaExternalLinkAlt, FaGithub, FaCalendarAlt, FaUser, FaTags } from 'react-icons/fa';

const Projects = () => {
    const [projects, setProjects] = useState<ProjectDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.projects.getAll();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please refresh the page.");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section 
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white"
        }}
      >
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </section>
    );
  }

  if (error || !projects.length) {
    return (
      <section 
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white"
        }}
      >
        <div className="text-center">
          <p className="text-danger">{error || "No projects available"}</p>
          <button 
            className="btn btn-outline-light mt-3" 
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        color: "white",
        paddingTop: "120px",
        paddingBottom: "80px",
        minHeight: "100vh"
      }}
    >
      <div className="container">
        {/* Section title */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ 
            fontSize: "2.8rem", 
            fontWeight: "700", 
            marginBottom: "1rem",
            background: "linear-gradient(90deg, #4361ee, #4cc9f0)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block"
          }}>
            My Projects
          </h2>
          <div style={{ width: "60px", height: "4px", background: "#4361ee", margin: "0 auto" }}></div>
          <p style={{ 
            maxWidth: "700px", 
            margin: "20px auto 0", 
            color: "#cbd5e1",
            fontSize: "1.1rem",
            lineHeight: "1.7"
          }}>
            Explore my latest work and projects that showcase my skills and expertise in web development.
          </p>
        </div>

        {/* Projects grid */}
        <div className="row g-4">
          {projects.map((project) => (
            <div className="col-md-6 col-lg-4" key={project.id}>
              <div 
                style={{
                  background: "rgba(30, 41, 59, 0.7)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)";
                }}
              >
                {/* Project image */}
                <div style={{ position: "relative" }}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      objectPosition: "center top"
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)",
                    pointerEvents: "none"
                  }}></div>
                </div>

                {/* Project content */}
                <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                  {/* Project tags */}
                  <div style={{ 
                    display: "flex", 
                    flexWrap: "wrap", 
                    gap: "8px", 
                    marginBottom: "12px"
                  }}>
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index}
                        style={{
                          background: "rgba(67, 97, 238, 0.15)",
                          color: "#7dd3fc",
                          padding: "4px 10px",
                          borderRadius: "50px",
                          fontSize: "0.75rem",
                          fontWeight: "500"
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Project title */}
                  <h3 style={{ 
                    fontSize: "1.25rem", 
                    fontWeight: "700", 
                    marginBottom: "10px",
                    color: "#f1f5f9"
                  }}>
                    {project.title}
                  </h3>

                  {/* Project description */}
                  <p style={{ 
                    color: "#cbd5e1", 
                    marginBottom: "20px", 
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    flex: "1"
                  }}>
                    {project.description.length > 120 
                      ? `${project.description.substring(0, 120)}...` 
                      : project.description}
                  </p>

                  {/* Project meta */}
                  <div style={{ 
                    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                    paddingTop: "15px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "15px",
                    fontSize: "0.85rem",
                    color: "#94a3b8"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <FaCalendarAlt size={14} style={{ color: "#4cc9f0" }} />
                      {project.duration}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <FaUser size={14} style={{ color: "#4cc9f0" }} />
                      {project.role}
                    </div>
                  </div>

                  {/* Project actions */}
                  <div style={{ 
                    display: "flex", 
                    gap: "10px", 
                    marginTop: "20px",
                    justifyContent: "space-between"
                  }}>
                    <Link 
                      to={`/project/${project.id}`}
                      style={{
                        background: "linear-gradient(to right, #4361ee, #3a0ca3)",
                        color: "white",
                        padding: "10px 16px",
                        borderRadius: "8px",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        flex: "1",
                        justifyContent: "center",
                        border: "none",
                        transition: "opacity 0.2s ease",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.opacity = "0.9";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.opacity = "1";
                      }}
                    >
                      View Details
                    </Link>
                    
                    <div style={{ display: "flex", gap: "10px" }}>
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: "rgba(30, 41, 59, 0.8)",
                            color: "white",
                            width: "40px",
                            height: "40px",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            transition: "background 0.2s ease",
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = "rgba(67, 97, 238, 0.3)";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = "rgba(30, 41, 59, 0.8)";
                          }}
                        >
                          <FaGithub size={18} />
                        </a>
                      )}
                      
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: "rgba(30, 41, 59, 0.8)",
                            color: "white",
                            width: "40px",
                            height: "40px",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            transition: "background 0.2s ease",
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = "rgba(67, 97, 238, 0.3)";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = "rgba(30, 41, 59, 0.8)";
                          }}
                        >
                          <FaExternalLinkAlt size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;