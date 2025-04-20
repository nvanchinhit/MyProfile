import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCalendar, FaUsers, FaTasks, FaCode, FaClock } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api, { ProjectDetail as ProjectDetailType } from '../services/api';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        if (!id) throw new Error('Project ID not provided');
        const data = await api.projects.getById(id) as ProjectDetailType;
        setProject(data);
        setActiveImage(data.image);
        setLoading(false);

        // Set page title
        document.title = `${data.title} | Project Details`;
      } catch (err) {
        console.error('Error fetching project details:', err);
        setError('Failed to load project details. Please try again later.');
        setLoading(false);
      }
    };

    fetchProjectDetails();
    
    // Reset title when component unmounts
    return () => {
      document.title = 'My Portfolio';
    };
  }, [id]);

  if (loading) {
    return (
      <div 
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          paddingTop: "80px"
        }}
      >
        <div className="text-center">
          <div className="spinner-border text-light mb-3" style={{ width: "3rem", height: "3rem" }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h2 style={{ fontWeight: "300", fontSize: "1.5rem" }}>Loading project details...</h2>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div 
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          paddingTop: "80px"
        }}
      >
        <div className="text-center">
          <div style={{ fontSize: "4rem", marginBottom: "1.5rem", opacity: "0.6" }}>⚠️</div>
          <h2 className="text-danger mb-4" style={{ fontWeight: "600" }}>{error || 'Project not found'}</h2>
          <Link 
            to="/projects" 
            style={{
              background: "linear-gradient(to right, #4361ee, #3a0ca3)",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 4px 15px rgba(67, 97, 238, 0.3)",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.opacity = "0.9";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <FaArrowLeft /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div 
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        color: "#e2e8f0",
        minHeight: "100vh",
        paddingTop: "80px",
        paddingBottom: "60px"
      }}
    >
      <div 
        style={{
          background: "rgba(15, 23, 42, 0.3)",
          padding: "40px 0",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
        }}
      >
        <div className="container">
          <div style={{ marginBottom: "30px" }}>
            <Link 
              to="/projects" 
              style={{
                color: "#94a3b8",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.95rem",
                fontWeight: "500",
                transition: "color 0.2s ease",
                padding: "8px 16px",
                borderRadius: "8px",
                background: "rgba(30, 41, 59, 0.5)",
                border: "1px solid rgba(255, 255, 255, 0.05)"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#4cc9f0";
                e.currentTarget.style.background = "rgba(67, 97, 238, 0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "#94a3b8";
                e.currentTarget.style.background = "rgba(30, 41, 59, 0.5)";
              }}
            >
              <FaArrowLeft size={14} /> Back to Projects
            </Link>
          </div>

          <div className="row">
            <div className="col-lg-8">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
                {project.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    style={{
                      background: "rgba(67, 97, 238, 0.15)",
                      color: "#7dd3fc",
                      padding: "5px 12px",
                      borderRadius: "50px",
                      fontSize: "0.75rem",
                      fontWeight: "500"
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 
                style={{ 
                  fontSize: "2.5rem", 
                  fontWeight: "700", 
                  marginBottom: "10px",
                  background: "linear-gradient(90deg, #fff, #cbd5e1)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                {project.title}
              </h1>
              
              <p 
                style={{ 
                  fontSize: "1.2rem", 
                  color: "#94a3b8", 
                  marginBottom: "30px",
                  maxWidth: "90%",
                  lineHeight: "1.6"
                }}
              >
                {project.subtitle}
              </p>

              <div style={{ display: "flex", gap: "15px", marginBottom: "40px" }}>
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "linear-gradient(to right, #4361ee, #3a0ca3)",
                      color: "white",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontWeight: "600",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      boxShadow: "0 4px 15px rgba(67, 97, 238, 0.2)",
                      transition: "all 0.3s ease"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.opacity = "0.9";
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = "0 8px 25px rgba(67, 97, 238, 0.3)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 15px rgba(67, 97, 238, 0.2)";
                    }}
                  >
                    <FaExternalLinkAlt size={14} /> Live Demo
                  </a>
                )}
                
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "rgba(30, 41, 59, 0.7)",
                      color: "white",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontWeight: "600",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      transition: "all 0.3s ease"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "rgba(30, 41, 59, 0.9)";
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "rgba(30, 41, 59, 0.7)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <FaGithub size={16} /> Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8 pe-lg-5 mb-5 mb-lg-0">
            {/* Main image showcase */}
            <div 
              style={{
                marginBottom: "30px",
                background: "rgba(15, 23, 42, 0.5)",
                padding: "10px",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <img
                src={activeImage || project.image}
                alt={project.title}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  maxHeight: "500px",
                  objectFit: "cover",
                  objectPosition: "top center"
                }}
              />
            </div>

            {/* Thumbnails */}
            <div 
              style={{ 
                display: "flex", 
                gap: "12px", 
                overflowX: "auto", 
                marginBottom: "40px", 
                padding: "5px 0",
                scrollbarWidth: "thin"
              }}
            >
              <div 
                style={{
                  width: "80px",
                  height: "60px",
                  borderRadius: "6px",
                  overflow: "hidden",
                  cursor: "pointer",
                  border: activeImage === project.image ? "2px solid #4361ee" : "2px solid transparent",
                  opacity: activeImage === project.image ? 1 : 0.7,
                  transition: "all 0.2s ease"
                }}
                onClick={() => setActiveImage(project.image)}
              >
                <img 
                  src={project.image} 
                  alt="Main" 
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>
              
              {project.screenshots.map((screenshot, index) => (
                <div 
                  key={index} 
                  style={{
                    width: "80px",
                    height: "60px",
                    borderRadius: "6px",
                    overflow: "hidden",
                    cursor: "pointer",
                    border: activeImage === screenshot ? "2px solid #4361ee" : "2px solid transparent",
                    opacity: activeImage === screenshot ? 1 : 0.7,
                    transition: "all 0.2s ease"
                  }}
                  onClick={() => setActiveImage(screenshot)}
                >
                  <img 
                    src={screenshot} 
                    alt={`Screenshot ${index + 1}`} 
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Project overview */}
            <div 
              style={{
                background: "rgba(15, 23, 42, 0.5)",
                borderRadius: "12px",
                padding: "30px",
                marginBottom: "30px",
                border: "1px solid rgba(255, 255, 255, 0.05)"
              }}
            >
              <h3 
                style={{ 
                  marginBottom: "20px", 
                  fontSize: "1.5rem", 
                  fontWeight: "600",
                  color: "#f8fafc",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                <span 
                  style={{
                    display: "inline-block",
                    width: "6px",
                    height: "24px",
                    background: "linear-gradient(to bottom, #4361ee, #4cc9f0)",
                    borderRadius: "3px",
                    marginRight: "10px"
                  }}
                ></span>
                Project Overview
              </h3>
              
              <p 
                style={{ 
                  fontSize: "1.05rem", 
                  lineHeight: "1.8", 
                  color: "#cbd5e1",
                  marginBottom: "20px"
                }}
              >
                {project.description}
              </p>

              <div 
                style={{ 
                  color: "#cbd5e1",
                  lineHeight: "1.8"
                }}
                dangerouslySetInnerHTML={{ __html: project.longDescription }}
              ></div>
            </div>
            
            {/* Gallery section */}
          </div>

          <div className="col-lg-4">
            <div 
              style={{
                background: "rgba(15, 23, 42, 0.5)",
                borderRadius: "12px",
                padding: "25px",
                marginBottom: "30px",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                top: "100px"
              }}
            >
              <h4 
                style={{ 
                  marginBottom: "25px", 
                  fontSize: "1.3rem", 
                  fontWeight: "600",
                  color: "#f8fafc"
                }}
              >
                Project Details
              </h4>

              <div 
                style={{ 
                  display: "flex", 
                  alignItems: "flex-start", 
                  marginBottom: "20px",
                  gap: "15px"
                }}
              >
                <div 
                  style={{
                    background: "rgba(67, 97, 238, 0.15)",
                    borderRadius: "10px",
                    width: "45px",
                    height: "45px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  <FaCalendar size={18} style={{ color: "#4cc9f0" }} />
                </div>
                <div>
                  <h6 style={{ fontSize: "0.95rem", fontWeight: "600", marginBottom: "5px", color: "#e2e8f0" }}>
                    Duration
                  </h6>
                  <p style={{ color: "#94a3b8", marginBottom: "0", fontSize: "0.9rem" }}>
                    {project.duration}
                  </p>
                </div>
              </div>

              <div 
                style={{ 
                  display: "flex", 
                  alignItems: "flex-start", 
                  marginBottom: "20px",
                  gap: "15px"
                }}
              >
                <div 
                  style={{
                    background: "rgba(67, 97, 238, 0.15)",
                    borderRadius: "10px",
                    width: "45px",
                    height: "45px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  <FaUsers size={18} style={{ color: "#4cc9f0" }} />
                </div>
                <div>
                  <h6 style={{ fontSize: "0.95rem", fontWeight: "600", marginBottom: "5px", color: "#e2e8f0" }}>
                    Team
                  </h6>
                  <p style={{ color: "#94a3b8", marginBottom: "0", fontSize: "0.9rem" }}>
                    {project.team}
                  </p>
                </div>
              </div>

              <div 
                style={{ 
                  display: "flex", 
                  alignItems: "flex-start", 
                  marginBottom: "20px",
                  gap: "15px"
                }}
              >
                <div 
                  style={{
                    background: "rgba(67, 97, 238, 0.15)",
                    borderRadius: "10px",
                    width: "45px",
                    height: "45px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  <FaCode size={18} style={{ color: "#4cc9f0" }} />
                </div>
                <div>
                  <h6 style={{ fontSize: "0.95rem", fontWeight: "600", marginBottom: "5px", color: "#e2e8f0" }}>
                    My Role
                  </h6>
                  <p style={{ color: "#94a3b8", marginBottom: "0", fontSize: "0.9rem" }}>
                    {project.role}
                  </p>
                </div>
              </div>
            </div>

            <div 
              style={{
                background: "rgba(15, 23, 42, 0.5)",
                borderRadius: "12px",
                padding: "25px",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                position: "sticky",
                top: "100px"
              }}
            >
              <h4 
                style={{ 
                  marginBottom: "20px", 
                  fontSize: "1.3rem", 
                  fontWeight: "600",
                  color: "#f8fafc"
                }}
              >
                Key Challenges
              </h4>
              <p 
                style={{ 
                  color: "#94a3b8", 
                  lineHeight: "1.7",
                  fontSize: "0.95rem"
                }}
              >
                {project.challenges}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;