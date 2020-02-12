'use strict'

class createUser {
  get rules () {
    return {
      'username': 'required|unique:users',
      'email': 'required|unique:users',
      'password': 'required'
    }
  }
  
  get messages() {
    return {
      'required': '{{field}} is required',
      'unique': '{{field}} already existSs'
    }
  }

  async fails(error){
    this.ctx.session.withErrors(error).flashAll();
    return this.ctx.response.redirect('back');
  }

}


module.exports = createUser
