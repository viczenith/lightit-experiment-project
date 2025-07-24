import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from 'react';
import api from '../utils/api';

const ExperimentContext = createContext();

export function ExperimentProvider({ children }) {
  const [experiments, setExperiments] = useState([]);
  const [loading, setLoading]         = useState(false);


  const fetchExperiments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/experiments');
      const normalized = res.data.map(exp => ({
        ...exp,
        id: exp._id,
      }));
      setExperiments(normalized);
    } catch (err) {
      console.error('Failed to fetch experiments', err);
    }
    setLoading(false);
  }, []);

  // Initial load
  useEffect(() => {
    fetchExperiments();
  }, [fetchExperiments]);

  /**
   * Toggle status → approved + visible
   */
  const toggleExperimentStatus = async (id) => {
    const exp = experiments.find(e => e.id === id);
    if (!exp) throw new Error('Experiment not found');
    if (exp.status === 'approved') return exp;

    const payload = { ...exp, status: 'approved', visible: true };
    const res = await api.put(`/experiments/${id}`, payload);
    const updated = { ...res.data, id: res.data._id };

    setExperiments(list =>
      list.map(e => (e.id === id ? updated : e))
    );
    return updated;
  };

  /**
   * Delete an experiment
   */
  const deleteExperiment = async (id) => {
    await api.delete(`/experiments/${id}`);
    setExperiments(list => list.filter(e => e.id !== id));
  };

  /**
   * Update an existing experiment
   */
  const updateExperiment = async (id, data) => {
    const res = await api.put(`/experiments/${id}`, data);
    const updated = { ...res.data, id: res.data._id };
    setExperiments(list =>
      list.map(e => (e.id === id ? updated : e))
    );
    return updated;
  };

  /**
   * Add a new experiment
   */
  const addExperiment = async (exp) => {
    const res = await api.post('/experiments', exp);
    const created = { ...res.data, id: res.data._id };
    setExperiments(list => [created, ...list]);
    return created;
  };

  return (
    <ExperimentContext.Provider value={{
      experiments,
      loading,
      fetchExperiments,
      toggleExperimentStatus,
      deleteExperiment,
      updateExperiment,
      addExperiment
    }}>
      {children}
    </ExperimentContext.Provider>
  );
}

export function useExperiments() {
  return useContext(ExperimentContext);
}
