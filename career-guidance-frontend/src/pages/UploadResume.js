import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Navbar from '../components/Navbar';
import './Upload.css';

function UploadResume() {
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a resume file');
      return;
    }
    if (!targetRole.trim()) {
      setError('Please enter a target role');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const uploadRes = await API.post('/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const resumeId = uploadRes.data._id;

      const analyzeRes = await API.post('/analysis/analyze', {
        resumeId,
        targetRole,
      });

      navigate('/results', { state: { analysis: analyzeRes.data } });
    } catch (err) {
      setError(err.response?.data?.message || 'Upload or analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="upload-container">
        <div className="upload-box">
          <span className="tag">Step 1</span>
          <h2>Upload your resume</h2>
          <p className="upload-sub">PDF or DOCX. We will scan it and map your skills.</p>

          {error && <p className="error-text">{error}</p>}

          <form onSubmit={handleSubmit}>
            <label className="file-drop">
              <input type="file" accept=".pdf,.docx" onChange={handleFileChange} hidden />
              {file ? file.name : 'Click to choose a file'}
            </label>

            <label className="field-label">Target role</label>
            <input
              type="text"
              className="text-input"
              placeholder="e.g. Frontend Developer"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Analyzing...' : 'Upload and Analyze'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UploadResume;