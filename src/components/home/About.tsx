import { FaCode, FaDesktop, FaChartLine, FaLaptopCode } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { AboutData, SkillItem } from '../../services/api';
import api from '../../services/api';

// Map icon strings from API to actual React components
const iconComponents: Record<string, JSX.Element> = {
  'FaCode': <FaCode size={36} className="text-primary" />,
  'FaLaptopCode': <FaLaptopCode size={36} className="text-primary" />,
  'FaChartLine': <FaChartLine size={36} className="text-primary" />,
  'FaDesktop': <FaDesktop size={36} className="text-primary" />
};

const About = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await api.about.getData();
        // Lấy phần tử đầu tiên từ mảng about
        if (data && data.length > 0) {
          setAboutData(data[0]);
        } else {
          setError("About data not found");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching about data:", err);
        setError("Failed to load about data. Please refresh the page.");
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <section id="about" className="py-3 my-0 bg-light min-vh-50 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </section>
    );
  }

  if (error || !aboutData) {
    return (
      <section id="about" className="py-3 my-0 bg-light min-vh-50 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <p className="text-danger">{error || "About data not available"}</p>
          <button className="btn btn-outline-primary" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </section>
    );
  }

  // Transform skills data from API to include actual React icon components
  const skillsWithIcons = aboutData.skills.map((skill: SkillItem) => ({
    ...skill,
    icon: iconComponents[skill.icon] || iconComponents['FaCode'] // Default to FaCode if icon not found
  }));

  return (
    <section id="about" className="py-3 my-0 bg-light"> {/* Giảm padding/margin */}
      <div className="container">
        <div className="text-center mb-3">
          <h2 className="mb-4">About Me</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
            {aboutData.summary}
          </p>
        </div>

        <div className="row g-4 mb-3">
          {skillsWithIcons.map((skill, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm skill-card text-center p-4">
                <div className="card-body d-flex flex-column align-items-center">
                  <div className="icon-wrapper mb-3 d-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10" style={{ width: '70px', height: '70px' }}>
                    {skill.icon}
                  </div>
                  <h3 className="h5 fw-bold mb-3">{skill.title}</h3>
                  <p className="text-muted small">{skill.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#projects"
            className="btn btn-primary px-4 py-2"
          >
            Check Out My Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
