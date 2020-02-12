'use strict'

const User = use('App/Models/User')

class UserController {
    async create({request, response, auth}){

        // const {username, email, password} = request.post();
        // console.log(username);
        // const user = new User({})
        // user.username = username
        // user.password = password
        // user.email = email
        // await user.save()

        const user = await User.create(request.only(['username','email','password'])) 
        await auth.login(user);
        return response.redirect('/');
    }


    async login({request,auth,response,session}){
        const {email, password} = request.all();
        try {
            await auth.attempt(email,password);
            return response.redirect('/')
        }
        catch(error){
            session.flash({loginError: 'Credentials are wrong'});
            return response.redirect('/login');
        }
    }
}

module.exports = UserController
