// routes/upload.js
import express from 'express';
import multer from 'multer';
import { uploadPreviewImage } from '../config/cloudinary.js';
import Poll from '../models/Poll.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/preview', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const { pollId, platform } = req.body; // Pass pollId and platform in formData
    if (!pollId || !platform) return res.status(400).json({ error: 'pollId and platform are required' });

    // Upload preview image to Cloudinary
    const hostedPreviewImage = await uploadPreviewImage(req.file.buffer);
    console.log("🚀 ~ uploaded preview image:", hostedPreviewImage);

    // Save the URL in the correct platform key
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ error: 'Poll not found' });

    // Update the previewImages object
    poll.previewImages = poll.previewImages || {};
    poll.previewImages[platform] = hostedPreviewImage;

    await poll.save();

    res.status(200).json({ hostedPreviewImage, previewImages: poll.previewImages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload and save preview image' });
  }
});

export default router;
