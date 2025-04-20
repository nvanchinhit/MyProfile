import { FaGraduationCap, FaCertificate } from "react-icons/fa";
import { useEffect, useState } from "react";
import api, { EducationItem } from "../../services/api";

const Education = () => {
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const data = await api.education.getAll();
        setEducation(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching education data:', err);
        setError('Failed to load education data. Please try again later.');
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  // Function to render the appropriate icon based on iconType
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'FaGraduationCap':
        return <FaGraduationCap className="fs-5 text-white" />;
      case 'FaCertificate':
        return <FaCertificate className="fs-5 text-white" />;
      default:
        return <FaGraduationCap className="fs-5 text-white" />;
    }
  };

  if (loading) {
    return (
      <section id="education" className="py-3 bg-light">
        <div className="container py-3 text-center">
          <h2 className="mb-4">Education & Certificates</h2>
          <p>Loading education data...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="education" className="py-3 bg-light">
        <div className="container py-3 text-center">
          <h2 className="mb-4">Education & Certificates</h2>
          <p className="text-danger">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="education" className="py-3 bg-light">
      <div className="container py-3">
        <div className="text-center mb-5">
          <h2 className="mb-4">Education & Certificates</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
            My educational background and professional certifications that have shaped my career.
          </p>
        </div>

        <div className="d-flex flex-nowrap overflow-auto pb-4" style={{ scrollSnapType: "x mandatory" }}>
          {education.map((item) => (
            <div
              key={item.id}
              className="me-4"
              style={{ minWidth: "300px", scrollSnapAlign: "start" }}
            >
              <div className="card h-100 shadow-sm">

                {/* Hình ảnh nhỏ hơn */}
                <img
                  src={item.image || "/placeholder.svg"}
                  className="card-img-top"
                  alt={item.title}
                  style={{ height: "140px", objectFit: "cover" }} // Điều chỉnh kích thước ảnh
                />

                <div className="card-body position-relative">

                  {/* Icon chỉnh đẹp hơn */}
                  <div
                    className={`position-absolute top-0 start-50 translate-middle d-flex align-items-center justify-content-center rounded-circle bg-${item.color} border border-white shadow`}
                    style={{ width: "42px", height: "42px", zIndex: 2 }}
                  >
                    {renderIcon(item.iconType)}
                  </div>

                  <div className="mt-3">
                    <h3 className="h6 fw-bold">{item.title}</h3>
                    <span className={`badge bg-${item.color} mb-2`}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                  </div>

                  <p className="text-muted small">{item.organization}</p>

                  {/* Ngày tháng xuống dưới */}
                  <div className="mt-2">
                    <p className="text-muted small mb-1">{item.date}</p>
                    <p className="text-muted small">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-3">
          <small className="text-muted">Scroll horizontally to see more →</small>
        </div>
      </div>
    </section>
  );
};

export default Education;
