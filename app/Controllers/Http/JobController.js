'use strict'

const Job = use('App/Models/Job')

class JobController {
    async home({view}){
        // const job = new Job;
        // job.title = 'My Job Title';
        // job.link = 'http://google.com';
        // job.description = 'My Job Desc';
        // await job.save();

        //fetch
        const jobs = await Job.all();
        return view.render('index',{jobs: jobs.toJSON()})
    }
}

module.exports = JobController
