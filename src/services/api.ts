const API_BASE_URL = 'https://json-server-api-c13t.onrender.com/api';

// Interface definitions
export interface EducationItem {
  id: number;
  type: string;
  iconType: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  color: string;
  image: string;
}

export interface ProjectLinks {
  demo: string;
  github: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: ProjectLinks;
  duration: string; // Thêm vào
  role: string; 
}

export interface ProjectDetail extends Project {
  subtitle: string;
  longDescription: string;
  screenshots: string[];
  duration: string;
  team: string;
  role: string;
  challenges: string;
}

export interface ContactFormData {
  id?: number; // Thêm id là thuộc tính tùy chọn
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// Cập nhật interface BannerData với id
export interface BannerData {
  id: number;
  welcomeText: string;
  name: string;
  description: string;
  avatar: string;
  yearsExperience: number;
  totalProjects: number;
  resumeLink: string;
}

export interface SkillItem {
  icon: string;
  title: string;
  description: string;
}

// Cập nhật interface AboutData với id
export interface AboutData {
  id: number;
  summary: string;
  skills: SkillItem[];
}

async function fetchAPI<T>(endpoint: string): Promise<T> {
  try {
    console.log(`[API] Fetching ${endpoint}`);
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as T;
    return data;
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
}

export const educationAPI = {
  getAll: async (): Promise<EducationItem[]> => {
    return fetchAPI<EducationItem[]>('education');
  },

  getById: async (id: number): Promise<EducationItem> => {
    return fetchAPI<EducationItem>(`education/${id}`);
  }
};

export const projectsAPI = {
  getAll: async (): Promise<Project[]> => {
    return fetchAPI<Project[]>('projects');
  },

  getById: async (id: number | string): Promise<ProjectDetail> => {
    return fetchAPI<ProjectDetail>(`projects/${id}`);
  }
};

export const contactAPI = {
  sendContact: async (contactData: ContactFormData): Promise<any> => {
    try {
      // Lấy tất cả dữ liệu hiện tại từ API để tìm ID lớn nhất
      const existingContacts = await fetchAPI<ContactFormData[]>('contacts');

      // Tìm ID lớn nhất hiện tại
      const maxId = existingContacts.reduce((max, contact) => {
        // Nếu contact có id thì lấy giá trị id, nếu không thì bỏ qua
        return contact.id ? Math.max(max, contact.id) : max;
      }, 0);

      // Tạo ID mới, tăng dần từ ID lớn nhất
      const newId = maxId + 1;

      // Thêm ID vào dữ liệu cần gửi
      const dataToSend = {
        ...contactData,
        id: newId // Sử dụng ID mới tự động tăng
      };

      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to send contact: ${response.status} ${response.statusText} - ${errorMessage}`);
      }

      const data = await response.json();

      // 👉 Reorder object to have 'id' first
      const { id: resId, ...rest } = data;
      const reordered = { id: resId, ...rest };

      return reordered;
    } catch (error: any) {
      console.error('Error sending contact:', error.message || error);
      throw new Error('Something went wrong while sending contact data.');
    }
  }
};

// Cập nhật bannerAPI để làm việc với mảng banner
export const bannerAPI = {
  getData: async (): Promise<BannerData[]> => {
    return fetchAPI<BannerData[]>('banner');
  },

  getById: async (id: number): Promise<BannerData> => {
    return fetchAPI<BannerData>(`banner/${id}`);
  }
};

// Cập nhật aboutAPI để làm việc với mảng about
export const aboutAPI = {
  getData: async (): Promise<AboutData[]> => {
    return fetchAPI<AboutData[]>('about');
  },

  getById: async (id: number): Promise<AboutData> => {
    return fetchAPI<AboutData>(`about/${id}`);
  }
};

const api = {
  education: educationAPI,
  projects: projectsAPI,
  contact: contactAPI,
  banner: bannerAPI,
  about: aboutAPI
};

export default api;
