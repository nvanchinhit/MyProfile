import { FaArrowDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { BannerData } from "../../services/api";
import api from "../../services/api";

const Banner = () => {
  const [bannerData, setBannerData] = useState<BannerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const data = await api.banner.getData();
        // Lấy phần tử đầu tiên từ mảng banner
        if (data && data.length > 0) {
          setBannerData(data[0]);
        } else {
          setError("Banner data not found");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching banner data:", err);
        setError("Failed to load banner data. Please refresh the page.");
        setLoading(false);
      }
    };

    fetchBannerData();
  }, []);

  if (loading) {
    return (
      <section id="home" className="bg-black text-white min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </section>
    );
  }

  if (error || !bannerData) {
    return (
      <section id="home" className="bg-black text-white min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <p className="text-danger">{error || "Banner data not available"}</p>
          <button className="btn btn-outline-light" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="bg-black text-white">
      <div className="container banner-content d-flex align-items-center min-vh-100">
        <div className="row align-items-center w-100">
          {/* Cột trái - Chứa văn bản */}
          <div className="col-lg-7 col-md-8 text-md-start text-center">
            <p className="text-info mb-2">{bannerData.welcomeText}</p>
            <h1 className="display-4 fw-bold mb-4">I am {bannerData.name}</h1>
            <p className="lead mb-5">
              {bannerData.description}
            </p>
            <div className="d-flex flex-wrap gap-3 justify-content-md-start justify-content-center">
              <a href="#projects" className="btn btn-light px-4 py-2">
                View My Work
              </a>
              <a
                href={bannerData.resumeLink}
                download="mycv.pdf"
                className="btn btn-outline-light px-4 py-2"
              >
                Download CV Me
              </a>
            </div>
          </div>

          {/* Cột phải - Chứa ảnh */}
          <div className="col-lg-5 col-md-4 d-flex justify-content-md-end justify-content-center position-relative mt-4 mt-md-0">
            {/* Hiệu ứng gradient bao quanh ảnh */}
            <div
              className="position-absolute z-0 rounded-pill"
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(128,0,128,0.3), rgba(255,20,147,0.3))",
                width: "320px",
                height: "400px",
                borderRadius: "40% 60% 55% 45% / 40% 45% 55% 60%",
                transform: "translateY(-15px)",
              }}
            ></div>

            {/* Ảnh chính */}
            <div
              className="position-relative overflow-hidden border border-4 border-white shadow-lg bg-white"
              style={{
                width: "300px",
                height: "380px",
                borderRadius: "40% 60% 55% 45% / 40% 45% 55% 60%",
                zIndex: 10,
              }}
            >
              <img
                src={bannerData.avatar}
                alt={`${bannerData.name} Avatar`}
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* Thông tin số năm kinh nghiệm */}
            <div
              className="position-absolute top-0 end-0 me-3 mt-3 p-3 text-center text-white"
              style={{
                background: "linear-gradient(135deg, #240046, #3c096c)", // Màu tím gradient
                borderRadius: "16px", // Bo góc mềm mại
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // Đổ bóng
                minWidth: "80px", // Đảm bảo không quá nhỏ
                transform: "translatey(-90%)",
              }}
            >
              <div className="fw-bold fs-5">{bannerData.yearsExperience}+</div>
              <div className="small">Years</div>
            </div>

            {/* Thông tin số dự án */}
            <div
              className="position-absolute bottom-0 start-0 ms-3 mb-3 p-3 text-center text-white"
              style={{
                background: "linear-gradient(135deg, #240046, #3c096c)", // Màu tím gradient
                borderRadius: "16px", // Bo góc đẹp hơn
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // Hiệu ứng đổ bóng
                minWidth: "80px", // Đảm bảo đủ rộng
              }}
            >
              <div className="fw-bold fs-5">{bannerData.totalProjects}+</div>
              <div className="small">Projects</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mũi tên xuống */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x pb-4">
        <a
          href="#about"
          className="text-white text-decoration-none d-inline-block bounce-animation"
        >
          <FaArrowDown size={24} />
        </a>
      </div>
    </section>
  );
};

export default Banner;
