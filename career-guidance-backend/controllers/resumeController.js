const Resume = require('../models/Resume');
const { PDFParse } = require('pdf-parse');
const mammoth = require('mammoth');

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    let extractedText = '';

  if (req.file.mimetype === 'application/pdf') {
  const parser = new PDFParse({ data: req.file.buffer });
  const result = await parser.getText();
  extractedText = result.text;
} else if (
      req.file.mimetype ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const result = await mammoth.extractRawText({ buffer: req.file.buffer });
      extractedText = result.value;
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({ message: 'Could not extract text from file' });
    }

    const resume = await Resume.create({
      userId: req.userId,
      originalFileName: req.file.originalname,
      extractedText,
    });

    res.status(201).json({
      _id: resume._id,
      originalFileName: resume.originalFileName,
      extractedText: resume.extractedText,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadResume };