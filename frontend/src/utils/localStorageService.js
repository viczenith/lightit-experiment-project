export const STORAGE_KEYS = {
  EXPERIMENTS: 'experiments',
  USERS: 'users',
  COMMENTS: 'comments',
};

const getData = (key) => {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
};

const setData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const LocalStorageService = {
  getExperiments: () => getData(STORAGE_KEYS.EXPERIMENTS),
  saveExperiment: (exp) => {
    const list = getData(STORAGE_KEYS.EXPERIMENTS);
    list.push(exp);
    setData(STORAGE_KEYS.EXPERIMENTS, list);
  },
  updateExperiment: (updated) => {
    const list = getData(STORAGE_KEYS.EXPERIMENTS).map(exp => exp.id === updated.id ? updated : exp);
    setData(STORAGE_KEYS.EXPERIMENTS, list);
  },
  getUsers: () => getData(STORAGE_KEYS.USERS),
  saveUser: (user) => {
    const list = getData(STORAGE_KEYS.USERS);
    list.push(user);
    setData(STORAGE_KEYS.USERS, list);
  },
  getComments: () => getData(STORAGE_KEYS.COMMENTS),
  saveComment: (comment) => {
    const list = getData(STORAGE_KEYS.COMMENTS);
    list.push(comment);
    setData(STORAGE_KEYS.COMMENTS, list);
  },
};
