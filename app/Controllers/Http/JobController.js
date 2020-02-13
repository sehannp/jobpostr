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

    async userIndex({view, auth}){
        const jobs = await auth.user.jobs().fetch()
        return view.render('jobs',{jobs: jobs.toJSON()});
    }

    async create({request,response,session,auth}){
        const jobs = await request.all();
        const posted = await auth.user.jobs().create({
            title: jobs.title,
            link: jobs.link,
            description: jobs.description
        })
        session.flash({message: 'Your job has been posted'});
        return response.redirect('back');
    }

    async delete({response,session,params}){
        const job = await Job.find(params.id);
        await job.delete();
        session.flash({message: 'Your job has been deleted'});
        return response.redirect('back');
    }

    async edit({params,view}){
        const job = await Job.find(params.id);
        return view.render('edit',{job: job});
    }

    async update({response,request, session, params}){
        const job = await Job.find(params.id);

        const {title,link,description} = request.all();
        job.title = title;
        job.link = link;
        job.description = description;
        
         await job.save();
        session.flash({message:'Your job has been updated'});

        return response.redirect('/post-a-job');
    }
}

module.exports = JobController
