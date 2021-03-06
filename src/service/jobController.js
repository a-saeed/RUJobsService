import JobModel from "../repository/jobModel";

// Display HR all jobs from recent to old
const getAllHRJobs = (req, res) => {
    JobModel.find({ hrID: req.params.id }).sort({ created_date: -1 }) //sort based on recent created date
        .then((results) => res.json(results))
        .catch((err) => res.status(404).json(err))
}

// Display all jobs in workspace from recent to old	
const getAllWSJobs = () => {

}

// Get jobs states with number for each one
const getJobStatesWithNum = (req, res) => {
    const states = {
        'all': 0,
        'active': 0,
        'hold': 0,
        'closed': 0
    };
    JobModel.find({})
        .then((jobs) => {
            states['all'] = jobs.length;
            jobs.forEach(e => states[e.stat] = states[e.stat]+1);
            res.json(states);
        })
        .catch((err) => res.status(400).json(err)); 
}

// Crud operations for job
const addNewJob = (req, res) => {
    const newJob = JobModel(req.body);
    newJob.save()
        .then((job) => res.json(job))
        .catch((err) => res.status(400).json(err)); 
}

const getJob = (req, res) => {
    const {id} = req.query;
    JobModel.findById(id)
        .then((job) => res.json(job))
        .catch((err) => res.status(400).json(err));
}

const updateJob = () => {

}

const deleteJob = () => {

}

// Handling all not found requests
const invalidRequest = (req, res) => {
    res.send("<h1>PAGE NOT FOUND</h1>");
}

module.exports = { 
    getAllHRJobs, getJobStatesWithNum, getAllWSJobs,
    addNewJob, getJob, updateJob, deleteJob, invalidRequest
};