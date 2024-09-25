const Job = require('../models/jobModel');
const requireAuth = require('../middleware/requireAuth')

const createJob = async (jobData) => {
    try {
      const job = new Job(jobData);
      await job.save();
      return job;
    } catch (error) {
      throw error;
    }
  };
  
  // Read all jobs
  const getAllJobs = async () => {
    try {
      const jobs = await Job.find();
      return jobs;
    } catch (error) {
      throw error;
    }
  };
  
  // Read a job by ID
  const getJobById = async (id) => {
    try {
      const job = await Job.findById(id);
      if (!job) {
        throw new Error('Job not found');
      }
      return job;
    } catch (error) {
      throw error;
    }
  };
  
  // Update a job by ID
  const updateJobById = async (id, updateData) => {
    try {
      const job = await Job.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
      if (!job) {
        throw new Error('Job not found');
      }
      return job;
    } catch (error) {
      throw error;
    }
  };
  
  // Delete a job by ID
  const deleteJobById = async (id) => {
    try {
      const job = await Job.findByIdAndDelete(id);
      if (!job) {
        throw new Error('Job not found');
      }
      return job;
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJobById,
    deleteJobById
  };
