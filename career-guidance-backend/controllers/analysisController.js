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
  "recommendations": ["recommendation1", "recommendation2"]
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
    await resume.save();

    res.status(200).json({
      _id: resume._id,
      targetRole: resume.targetRole,
      currentSkills: resume.currentSkills,
      missingSkills: resume.missingSkills,
      recommendations: resume.recommendations,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { analyzeResume };