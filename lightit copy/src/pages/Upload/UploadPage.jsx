import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useExperiments } from '../../context/ExperimentContext';
import UploadWizard from '../../components/experiments/UploadWizard';
import Modal from '../../components/ui/Modal';
import api from '../../utils/api';

export default function UploadPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { fetchExperiments } = useExperiments();
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newExp, setNewExp] = useState(null);

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      // 1) Convert images to base64
      const images64 = await Promise.all(
        data.images.map(file =>
          new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onload = () => res(reader.result);
            reader.onerror = () => rej(new Error('File read error'));
            reader.readAsDataURL(file);
          })
        )
      );

      // 2) Prepare payload
      const payload = {
        title:       data.title,
        grade:       data.grade,
        subject:     data.subject,
        description: data.description,
        videoUrl:    data.video,
        images:      images64,
        materials:   data.materials.filter(m => m.trim()),
        procedure:   data.procedure,
        precautions: data.precautions,
        results:     data.results,
        discussion:  data.discussion,
        createdBy:   user.id,
      };

      // 3) POST to backend
      const response = await api.post('/experiments', payload);
      const saved = response.data;
      setNewExp(saved);

      // 4) Refresh the experiments list in context
      fetchExperiments();

      // 5) Show success modal
      setShowModal(true);
    } catch (err) {
      console.error('Submission error:', err);
      // If the backend sent an error message, show it:
      const serverMsg = err.response?.data?.message;
      alert(
        serverMsg
          ? `Submission failed: ${serverMsg}`
          : 'An unexpected error occurred during submission. Please check console and try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleView = () => {
    setShowModal(false);
    navigate(`/experiments/${newExp.grade}/${encodeURIComponent(newExp.title)}/${newExp._id}`);
  };

  const handleList = () => {
    setShowModal(false);
    navigate('/educator/experiments');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Upload New Experiment</h1>
      <UploadWizard onSubmit={handleSubmit} isSubmitting={submitting} />

      {showModal && newExp && (
        <Modal isOpen onClose={() => setShowModal(false)} title="Upload Successful">
          <div className="text-center p-6">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-bold mb-2">Experiment Submitted!</h3>
            <p className="text-gray-600 mb-6">
              "{newExp.title}" has been created successfully.
            </p>
            <div className="flex justify-center gap-4">
              <button className="btn-primary px-6 py-3" onClick={handleView}>
                View
              </button>
              <button className="btn-secondary px-6 py-3" onClick={handleList}>
                My Experiments
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
