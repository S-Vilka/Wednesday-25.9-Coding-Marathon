const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, getJobById, updateJobById, deleteJobById } = require('../controllers/jobControllers');

// Create a new job
router.post('/', async (req, res) => {
  try {
    const jobData = req.body; // jobData comes from the request body
    const newJob = await createJob(jobData);
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await getAllJobs();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await getJobById(req.params.id);
    res.status(200).json(job);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Update a job by ID
router.put('/:id', async (req, res) => {
  try {
    const updateData = req.body;
    const updatedJob = await updateJobById(req.params.id, updateData);
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a job by ID
router.delete('/:id', async (req, res) => {
  try {
    await deleteJobById(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;