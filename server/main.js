import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  // code to run on server at startup
  
});

Accounts.onCreateUser(function(options, user){
    
    var profile = _.extend(_.pick(options.profile, 'bio'), {
        userId: user._id, 
        firstName: user.firstName,
        lastName: user.lastName,
        birthday: user.birthday,
        gender: user.gender
    });
    
    Profile.insert(profile);
    return user;
});