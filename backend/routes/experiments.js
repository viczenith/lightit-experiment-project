if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express    = require('express');
const Experiment = require('../models/Experiment');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public list
router.get('/', async (req, res) => {
  try {
    const { grade, subject } = req.query;
    const filter = { visible: true };
    if (grade)   filter.grade = grade;
    if (subject) filter.subject = subject;
    const exps = await Experiment.find(filter);
    res.json(exps);
  } catch (err) {
    console.error('GET /api/experiments error:', err);
    res.status(500).json({ message: 'Server error fetching experiments' });
  }
});

// Public detail
router.get('/:id', async (req, res) => {
  try {
    const exp = await Experiment.findById(req.params.id);
    if (!exp || !exp.visible) {
      return res.status(404).json({ message: 'Experiment not found' });
    }
    res.json(exp);
  } catch (err) {
    console.error(`GET /api/experiments/${req.params.id} error:`, err);
    res.status(500).json({ message: 'Server error fetching experiment' });
  }
});

// Admin: list all experiments
router.get('/auth/all', protect, authorize('admin'), async (req, res) => {
  try {
    const exps = await Experiment.find();
    res.json(exps);
  } catch (err) {
    console.error('GET /api/experiments/auth/all error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create (educator or admin)
router.post('/', protect, authorize('educator','admin'), async (req, res) => {
  try {
    const data = {
      ...req.body,
      createdBy:   req.user._id,
      creatorName: req.user.name,
    };
    const exp = await Experiment.create(data);
    res.status(201).json(exp);
  } catch (err) {
    console.error('POST /api/experiments error:', err);
    res.status(500).json({ message: 'Server error creating experiment' });
  }
});

// Update any field (admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const exp = await Experiment.findById(req.params.id);
    if (!exp) return res.status(404).json({ message: 'Experiment not found' });
    Object.assign(exp, req.body);
    const updated = await exp.save();
    res.json(updated);
  } catch (err) {
    console.error(`PUT /api/experiments/${req.params.id} error:`, err);
    res.status(500).json({ message: 'Server error updating experiment' });
  }
});

// Delete (admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    await Experiment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experiment deleted' });
  } catch (err) {
    console.error(`DELETE /api/experiments/${req.params.id} error:`, err);
    res.status(500).json({ message: 'Server error deleting experiment' });
  }
});

module.exports = router;
