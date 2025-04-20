import { FaGithub, FaExternalLinkAlt, FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { Project } from '../../services/api';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayCount, setDisplayCount] = useState(6); // Default number of projects to display

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.projects.getAll();
        setProjects(data);
        setFilteredProjects(data.slice(0, displayCount));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects data:', err);
        setError('Failed to load projects data. Please try again later.');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects whenever search term or display count changes
  useEffect(() => {
    if (!projects.length) return;
    
    const filtered = projects.filter(project => 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    setFilteredProjects(filtered.slice(0, displayCount));
  }, [searchTerm, displayCount, projects]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDisplayCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayCount(Number(e.target.value));
  };

  if (loading) {
    return (
      <section id="projects" className="py-3 py-md-3">
        <div className="container text-center">
          <h2 className="mb-4">My Projects</h2>
          <p>Loading projects data...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-3 py-md-3">
        <div className="container text-center">
          <h2 className="mb-4">My Projects</h2>
          <p className="text-danger">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-3 py-md-3">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="mb-4">My Projects</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
            Here are some of the projects I've worked on. Each project represents different skills and challenges
            I've tackled throughout my development journey.
          </p>
        </div>

        {/* Filter controls */}
        <div className="row mb-4">
          <div className="col-md-6 mb-3 mb-md-0">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <FaSearch className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control bg-light border-start-0"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="col-md-3 ms-auto">
            <select 
              className="form-select bg-light" 
              value={displayCount}
              onChange={handleDisplayCountChange}
            >
              <option value="3">Show 3</option>
              <option value="6">Show 6</option>
              <option value="9">Show 9</option>
              <option value="999">Show All</option>
            </select>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-5">
            <p className="mb-0">No projects match your search criteria.</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredProjects.map((project) => (
              <div key={project.id} className="col-md-6 mb-4">
                <div className="card h-100 border-0 shadow-sm project-card">
                  <div className="overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="card-img-top"
                      style={{ height: '220px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="card-body p-4">
                    <Link to={`/project/${project.id}`} className='card-title h5 fw-bold text-decoration-none'>{project.title}</Link>
                    <p className="card-text text-muted mb-3 small">{project.description}</p>
                    <div className="mb-3">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="badge bg-primary bg-opacity-10 text-primary me-2 mb-2 tech-badge"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div>
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        <FaExternalLinkAlt className="me-1" /> Live Demo
                      </a>
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-secondary"
                      >
                        <FaGithub className="me-1" /> Source Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {searchTerm && filteredProjects.length < projects.length && (
          <div className="text-center mt-4">
            <p className="text-muted">
              Showing {filteredProjects.length} of {projects.filter(p => 
                p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
              ).length} filtered projects
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;