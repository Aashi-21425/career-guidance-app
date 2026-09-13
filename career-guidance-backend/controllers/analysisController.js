const Resume = require('../models/Resume');
const model = require('../config/geminiConfig');

const analyzeResume = async (req, res) => {
  try {
    const { resumeId, targetRole } = req.body;

    if (!resumeId || !targetRole) {
      return res.status(400).json({ message: 'resumeId and targetRole are required' });
    }

    const resume = await Resume.findOne({ _id: resumeId, userId: req.userId });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const prompt = `
You are a career advisor. Analyze this resume text against the target job role.

Resume text:
${resume.extractedText}

Target role: ${targetRole}

Respond ONLY with valid JSON in this exact format, no extra text, no markdown code blocks:
{
  "currentSkills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "recommendations": ["recommendation1", "recommendation2"],
  "careerPaths": ["career path 1", "career path 2", "career path 3"],
  "learningResources": ["resource 1 with course/book name", "resource 2", "resource 3"]
}
    `;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();

    responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const aiResult = JSON.parse(responseText);

    resume.targetRole = targetRole;
    resume.currentSkills = aiResult.currentSkills || [];
    resume.missingSkills = aiResult.missingSkills || [];
    resume.recommendations = aiResult.recommendations || [];
    resume.careerPaths = aiResult.careerPaths || [];
    resume.learningResources = aiResult.learningResources || [];
    await resume.save();

    res.status(200).json({
      _id: resume._id,
      targetRole: resume.targetRole,
      currentSkills: resume.currentSkills,
      missingSkills: resume.missingSkills,
      recommendations: resume.recommendations,
      careerPaths: resume.careerPaths,
      learningResources: resume.learningResources,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL ANALYSES FOR THE LOGGED-IN USER
const getHistory = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .select('originalFileName targetRole currentSkills missingSkills recommendations careerPaths learningResources createdAt');

    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ONE SPECIFIC ANALYSIS BY ID
const getAnalysisById = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.userId });

    if (!resume) {
      return res.status(404).json({ message: 'Analysis not found' });
    }

    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { analyzeResume, getHistory, getAnalysisById };