// export default {
//   validateUser(user) {
//     let isValid = {}
//     if(this.validateUserName(user.name) !== null){
//       isValid.name = this.validateUserName(user.name)
//     }
//     if (user.password.length < 6) {
//       isValid.password = ['The password min 6']
//     }
//     if(this.validateEmail(user.email) !== null){
//       isValid.email = this.validateEmail(user.email)
//     }
//     return isValid
//   },

//   hasNumber(myString) {
//     return /\d/.test(myString);
//   },

//   validateUserName(username) {
//     if (username === '') {
//       return ['The username is required']
//     } else if (this.hasNumber(username)) {
//       return ['The username is not include number']
//     }
//     return null
//   },

//   validateEmail(email) {
//     let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     if (email === '') {
//       return ['The email is required']
//     } else if (!email.match(mailformat)) {
//       return ['The email is not valid']
//     }
//     return null
//   }
// }

function Validate(validateObj) {
  this.property = validateObj.property
  this.console = function() {
    return this.property
  }
}