import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_SERVER}/api`,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,'
  }
});

api.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem('token'); // localStorage에 TOKEN 저장
  config.headers.common['Authorization'] = `${accessToken}`; // Header에 토큰을 넣어서 보내준다.
  return config;
});

const TumblbugApis = {
  loginUser: (user) => api.post('/login', user),
  signUp: (user) => api.post('/signup', user),
  postThumbnailUpload: (formData) =>
    api.post('/images', formData, {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    }),
  postStoryImageUpload: (formData) =>
    api.post('/images', formData, {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    }),
  deleteImages: (images) => api.delete('/images', images),
  newPost: (post) => api.post('/projects', post),
  getPledges: () => api.get('/my-page'),
  getOnePledge: (fundId) => api.get(`/my-page/${fundId}`)
};

export const projectsApi = {
  // home 페이지에 모든 프로젝트 받기
  projectsAll: (category, sort, query) =>
    api.get(`/projects?category=${category}&sort=${sort}&query=${query}`), // FIXME: /api/projects?category=${category}&sort=${sort}

  // 상세 페이지에 프로젝트 가져오기
  projectDetail: (projectId) => api.get(`/projects/${projectId}`), // FIXME: /api/projects/{projectId}

  rewardPost: (reward) => api.post('/funds', reward)
};

export default TumblbugApis;
