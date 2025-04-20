import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaPaperPlane, FaMapMarkerAlt, FaMobile, FaGithub, FaFacebook , FaTiktok  } from 'react-icons/fa';
import api, {ContactFormData} from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    phone: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrors(prevState => ({ ...prevState, email: 'Email không hợp lệ' }));
      } else {
        setErrors(prevState => ({ ...prevState, email: '' }));
      }
    } else if (name === "phone") {
      if (!/^[+]?[0-9]{7,15}$/.test(value)) {
        setErrors(prevState => ({ ...prevState, phone: 'Số điện thoại không hợp lệ' }));
      } else {
        setErrors(prevState => ({ ...prevState, phone: '' }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    let emailError = "";
    let phoneError = "";
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      emailError = "Email không hợp lệ";
    }
  
    if (!/^[+]?[0-9]{7,15}$/.test(formData.phone)) {
      phoneError = "Số điện thoại không hợp lệ";
    }
  
    if (emailError || phoneError) {
      setErrors({ email: emailError, phone: phoneError });
      return;
    }
  
    try {
      console.log('Form submitted:', formData);
  
      await api.contact.sendContact(formData as ContactFormData);
  
      setFormSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setFormSubmitted(false);
      }, 5000);
    } catch (err) {
      alert('Gửi thất bại. Vui lòng thử lại!');
    }
  };
  
  return (
    <section 
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        color: "#e2e8f0",
        minHeight: "100vh",
        paddingTop: "120px",
        paddingBottom: "80px",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background shapes - more subtle */}
      <div style={{
        position: "absolute",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background: "rgba(67, 97, 238, 0.03)",
        top: "10%",
        left: "-150px",
        zIndex: 0
      }}></div>
      
      <div style={{
        position: "absolute",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "rgba(67, 97, 238, 0.02)",
        bottom: "-250px",
        right: "-100px",
        zIndex: 0
      }}></div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <div className="text-center mb-5">
          <h1 
            style={{ 
              fontSize: "2.8rem", 
              fontWeight: "700", 
              marginBottom: "20px",
              background: "linear-gradient(90deg, #fff, #cbd5e1)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Liên Hệ
          </h1>
          <p 
            style={{ 
              fontSize: "1.1rem", 
              maxWidth: "700px", 
              margin: "0 auto", 
              color: "#94a3b8",
              lineHeight: "1.7"
            }}
          >
            Hãy kết nối và chia sẻ ý tưởng của bạn với tôi. Tôi luôn sẵn sàng lắng nghe và phản hồi sớm nhất.
          </p>
        </div>

        <div 
          className="row g-4 justify-content-center" 
          style={{ 
            maxWidth: "1200px", 
            margin: "0 auto"
          }}
        >
          {/* Contact Form */}
          <div className="col-lg-7">
            <div 
              style={{
                background: "rgba(15, 23, 42, 0.5)",
                borderRadius: "12px",
                padding: "30px",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
                transition: "transform 0.3s ease",
                overflow: "hidden",
                position: "relative"
              }}
            >
              {/* Form content wrapper */}
              <div style={{ position: "relative", zIndex: 2 }}>
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
                  Gửi Tin Nhắn
                </h3>

                {formSubmitted && (
                  <div 
                    className="d-flex align-items-center mb-4 p-3" 
                    style={{
                      background: "rgba(16, 185, 129, 0.1)",
                      borderRadius: "8px",
                      border: "1px solid rgba(16, 185, 129, 0.2)",
                      color: "#4ade80",
                      fontSize: "0.95rem"
                    }}
                  >
                    <svg width="22" height="22" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                    <span>Tin nhắn đã được gửi thành công. Mình sẽ phản hồi sớm!</span>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-md-12">
                      <div className="form-floating mb-0">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Nguyễn Văn A"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          style={{
                            background: "rgba(30, 41, 59, 0.5)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            color: "#f1f5f9",
                            borderRadius: "8px",
                            height: "56px"
                          }}
                        />
                        <label 
                          htmlFor="name" 
                          style={{ 
                            color: "#94a3b8",
                            padding: "1rem 1.25rem" 
                          }}
                        >
                          <FaUser style={{ marginRight: "8px", opacity: 0.8 }} /> Họ và Tên
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating mb-0">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="example@gmail.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          style={{
                            background: "rgba(30, 41, 59, 0.5)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            color: "#f1f5f9",
                            borderRadius: "8px",
                            height: "56px"
                          }}
                        />
                        <label 
                          htmlFor="email" 
                          style={{ 
                            color: "#94a3b8", 
                            padding: "1rem 1.25rem"
                          }}
                        >
                          <FaEnvelope style={{ marginRight: "8px", opacity: 0.8 }} /> Email
                        </label>
                      </div>
                      {errors.email && 
                        <div className="mt-2 ms-2" style={{ color: "#f87171", fontSize: "0.875rem" }}>
                          {errors.email}
                        </div>
                      }
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating mb-0">
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          name="phone"
                          placeholder="+84 123 456 789"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          style={{
                            background: "rgba(30, 41, 59, 0.5)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            color: "#f1f5f9",
                            borderRadius: "8px",
                            height: "56px"
                          }}
                        />
                        <label 
                          htmlFor="phone" 
                          style={{ 
                            color: "#94a3b8", 
                            padding: "1rem 1.25rem"
                          }}
                        >
                          <FaPhone style={{ marginRight: "8px", opacity: 0.8 }} /> Số Điện Thoại
                        </label>
                      </div>
                      {errors.phone && 
                        <div className="mt-2 ms-2" style={{ color: "#f87171", fontSize: "0.875rem" }}>
                          {errors.phone}
                        </div>
                      }
                    </div>

                    <div className="col-md-12">
                      <div className="form-floating mb-0">
                        <select
                          className="form-select"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          style={{
                            background: "rgba(30, 41, 59, 0.5)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            color: "#f1f5f9",
                            borderRadius: "8px",
                            height: "56px"
                          }}
                        >
                          <option value="" disabled style={{ color: "#333" }}>Chọn chủ đề</option>
                          <option value="Cơ hội việc làm" style={{ color: "#333" }}>Cơ hội việc làm</option>
                          <option value="Hợp tác dự án" style={{ color: "#333" }}>Hợp tác dự án</option>
                          <option value="Khác" style={{ color: "#333" }}>Khác</option>
                        </select>
                        <label 
                          htmlFor="subject" 
                          style={{ 
                            color: "#94a3b8", 
                            padding: "1rem 1.25rem"
                          }}
                        >
                          Chủ Đề
                        </label>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-floating mb-0">
                        <textarea
                          className="form-control"
                          id="message"
                          name="message"
                          placeholder="Nhập tin nhắn của bạn..."
                          value={formData.message}
                          onChange={handleChange}
                          required
                          style={{
                            background: "rgba(30, 41, 59, 0.5)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            color: "#f1f5f9",
                            borderRadius: "8px",
                            height: "160px",
                            resize: "none"
                          }}
                        ></textarea>
                        <label 
                          htmlFor="message" 
                          style={{ 
                            color: "#94a3b8", 
                            padding: "1rem 1.25rem"
                          }}
                        >
                          Tin Nhắn
                        </label>
                      </div>
                    </div>

                    <div className="col-md-12 mt-2">
                      <button 
                        type="submit" 
                        className="btn w-100 py-3"
                        style={{
                          background: "linear-gradient(to right, #4361ee, #3a0ca3)",
                          color: "white",
                          padding: "12px 24px",
                          borderRadius: "8px",
                          fontWeight: "600",
                          fontSize: "1rem",
                          boxShadow: "0 4px 15px rgba(67, 97, 238, 0.3)",
                          transition: "all 0.3s ease",
                          border: "none"
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.opacity = "0.9";
                          e.currentTarget.style.transform = "translateY(-3px)";
                          e.currentTarget.style.boxShadow = "0 8px 25px rgba(67, 97, 238, 0.3)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.opacity = "1";
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "0 4px 15px rgba(67, 97, 238, 0.3)";
                        }}
                      >
                        <FaPaperPlane className="me-2" /> Gửi Tin Nhắn
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-5">
            <div className="row g-4">
              <div className="col-12">
                <div 
                  style={{
                    background: "rgba(15, 23, 42, 0.5)",
                    borderRadius: "12px",
                    padding: "30px",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
                    height: "100%",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
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
                    Thông Tin Liên Hệ
                  </h3>

                  <div className="d-flex align-items-center mb-4">
                    <div 
                      className="flex-shrink-0" 
                      style={{
                        background: "rgba(67, 97, 238, 0.15)",
                        borderRadius: "10px",
                        width: "45px",
                        height: "45px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "15px",
                        flexShrink: 0
                      }}
                    >
                      <FaMapMarkerAlt size={18} style={{ color: "#4cc9f0" }} />
                    </div>
                    <div>
                      <h5 
                        style={{ 
                          fontSize: "0.95rem", 
                          fontWeight: "600", 
                          marginBottom: "5px", 
                          color: "#e2e8f0" 
                        }}
                      >
                        Địa Chỉ
                      </h5>
                      <p style={{ color: "#94a3b8", margin: 0, fontSize: "0.9rem" }}>
                        Sơn Lộc, Can Lộc, Hà Tĩnh
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center mb-4">
                    <div 
                      className="flex-shrink-0" 
                      style={{
                        background: "rgba(67, 97, 238, 0.15)",
                        borderRadius: "10px",
                        width: "45px",
                        height: "45px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "15px",
                        flexShrink: 0
                      }}
                    >
                      <FaEnvelope size={18} style={{ color: "#4cc9f0" }} />
                    </div>
                    <div>
                      <h5 
                        style={{ 
                          fontSize: "0.95rem", 
                          fontWeight: "600", 
                          marginBottom: "5px", 
                          color: "#e2e8f0" 
                        }}
                      >
                        Email
                      </h5>
                      <p style={{ color: "#94a3b8", margin: 0, fontSize: "0.9rem" }}>
                        <a 
                          href="mailto:chinhnvpd10204@gmail.com" 
                          style={{ 
                            color: "#94a3b8", 
                            textDecoration: "none",
                            transition: "color 0.3s ease"
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.color = "#4cc9f0";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.color = "#94a3b8";
                          }}
                        >
                          chinhnvpd10204@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center">
                    <div 
                      className="flex-shrink-0" 
                      style={{
                        background: "rgba(67, 97, 238, 0.15)",
                        borderRadius: "10px",
                        width: "45px",
                        height: "45px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "15px",
                        flexShrink: 0
                      }}
                    >
                      <FaMobile size={18} style={{ color: "#4cc9f0" }} />
                    </div>
                    <div>
                      <h5 
                        style={{ 
                          fontSize: "0.95rem", 
                          fontWeight: "600", 
                          marginBottom: "5px", 
                          color: "#e2e8f0" 
                        }}
                      >
                        Số Điện Thoại
                      </h5>
                      <p style={{ color: "#94a3b8", margin: 0, fontSize: "0.9rem" }}>
                        <a 
                          href="tel:+84344757755" 
                          style={{ 
                            color: "#94a3b8", 
                            textDecoration: "none",
                            transition: "color 0.3s ease"
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.color = "#4cc9f0";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.color = "#94a3b8";
                          }}
                        >
                          +84 344-757-755
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div 
                  style={{
                    background: "rgba(15, 23, 42, 0.5)",
                    borderRadius: "12px",
                    padding: "30px",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
                    height: "100%",
                    transition: "transform 0.3s ease"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
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
                    Kết Nối Với Tôi
                  </h3>

                  <p style={{ color: "#94a3b8", marginBottom: "25px", fontSize: "0.95rem", lineHeight: "1.7" }}>
                    Theo dõi tôi trên các mạng xã hội để cập nhật thông tin mới nhất về các dự án và hoạt động.
                  </p>

                  <div 
                    style={{ 
                      display: "flex", 
                      gap: "12px" 
                    }}
                  >
                    <a
                      href="https://github.com/nvanchinhit"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "rgba(30, 41, 59, 0.7)",
                        color: "white",
                        width: "40px",
                        height: "40px",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        transition: "all 0.3s ease",
                        textDecoration: "none"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = "rgba(67, 97, 238, 0.3)";
                        e.currentTarget.style.transform = "translateY(-3px)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = "rgba(30, 41, 59, 0.7)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <FaGithub size={18} />
                    </a>
                    <a
                      href="https://www.facebook.com/vchinh.it"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "rgba(30, 41, 59, 0.7)",
                        color: "white",
                        width: "40px",
                        height: "40px",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        transition: "all 0.3s ease",
                        textDecoration: "none"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = "rgba(67, 97, 238, 0.3)";
                        e.currentTarget.style.transform = "translateY(-3px)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = "rgba(30, 41, 59, 0.7)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <FaFacebook size={18} />
                    </a>
                    <a
                      href="https://www.tiktok.com/@ngvanchinhh_"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "rgba(30, 41, 59, 0.7)",
                        color: "white",
                        width: "40px",
                        height: "40px",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        transition: "all 0.3s ease",
                        textDecoration: "none"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = "rgba(67, 97, 238, 0.3)";
                        e.currentTarget.style.transform = "translateY(-3px)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = "rgba(30, 41, 59, 0.7)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <FaTiktok  size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;