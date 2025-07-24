import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FloatingInput from '../../components/ui/FloatingInput';
import AnimatedButton from '../../components/ui/AnimatedButton';
import ParticleBackground from '../../components/layout/ParticleBackground';
import api from '../../utils/api';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field, value) =>
    setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      await api.post('/auth/register', form);
      navigate('/login', { replace: true });
    } catch (err) {
      setErrors({ general: err.response?.data?.message || err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <ParticleBackground />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md p-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl z-10"
      >
        <div className="text-center mb-8">
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Create an Account
          </motion.h2>
          <p className="text-gray-600">
            Join us and start sharing experiments
          </p>
        </div>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {errors.general}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <FloatingInput
            label="Full Name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
          />

          <FloatingInput
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <FloatingInput
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Register as:
            </label>
            <div className="flex flex-wrap gap-4">
              {['student', 'educator', 'admin'].map(role => (
                <div key={role} className="flex items-center">
                  <input
                    id={role}
                    name="role"
                    type="radio"
                    checked={form.role === role}
                    onChange={() => handleChange('role', role)}
                    className="h-4 w-4 text-science-blue focus:ring-science-blue"
                  />
                  <label
                    htmlFor={role}
                    className="ml-2 block text-sm text-gray-700 capitalize"
                  >
                    {role}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <AnimatedButton
            type="submit"
            className="w-full justify-center"
            loading={loading}
          >
            Register
          </AnimatedButton>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              className="text-science-blue font-medium hover:underline"
              onClick={() => navigate('/login')}
            >
              Sign in
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
