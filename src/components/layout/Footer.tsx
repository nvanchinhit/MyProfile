import { FaGithub, FaFacebook , FaEnvelope } from 'react-icons/fa';
import { SiZalo } from "react-icons/si";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub size={20} />, url: 'https://github.com/nvanchinhit', label: 'GitHub' },
    { icon: <SiZalo size={20} />, url: 'https://zalo.me/0344.757.955', label: 'Zalo' },
    { icon: <FaFacebook  size={20} />, url: 'https://www.facebook.com/vchinh.it', label: 'Twitter' },
    { icon: <FaEnvelope size={20} />, url: 'mailto:chinhnvpd10204@gmail.com', label: 'Email' },
  ];

  return (
<footer id="contact" className="bg-black text-white">
<div className="container py-4">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <h2 className="mb-3">Contact For Me</h2>
            <p className="mb-1">Contact us to create great projects together</p>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-md-end justify-content-center gap-3">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon bg-white bg-opacity-10 p-2 rounded-circle d-flex align-items-center justify-content-center"
                  aria-label={link.label}
                  style={{ width: '40px', height: '40px' }}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="my-4 border-white border-opacity-25" />

        <div className="text-center text-white-50">
          <small>&copy; {currentYear} My Portfolio. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
