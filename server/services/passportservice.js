require("dotenv").config();
const Jobportalsupport = require("../model/jobportalsupport.scema");
const bcrypt = require("bcrypt");
const googlestrategy = require("passport-google-oauth20").Strategy;

const intaialization = async (passport) => {
  passport.use(
    new googlestrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8090/auth/google/callback",
        scope: ['profile', 'email']
      },
      async function (accessToken, refreshToken, profile, cb) {
        // console.log(profile);
        try {
          let user = await Jobportalsupport.findOne({ email: profile.emails[0].value });
            console.log(user);
            
          if (user) {
            const isPasswordValid = await bcrypt.compare(`${profile.name.givenName}@${profile.id}`, user.password);
      
            if (!isPasswordValid) {
              return cb(null, false, { message: "Incorrect password" });
            }
      
            let token = await user.genauthToken();
            console.log(token)
      
            return cb(null, user); 
          } else {

            let custompassword = profile.name.givenName + "@" + profile.id;
            if (custompassword.length < 6) {
                custompassword += '123!';
              }
            //   console.log(custompassword)
            user = {
              googleId: profile.id,
              username : profile.displayName,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              email: profile.emails[0].value,
              profilePicture: profile.photos[0].value,
              password: custompassword
            };
              let newuser = await Jobportalsupport.create(user)

            let token = await newuser.genauthToken();
            console.log(token)
            console.log(newuser);
      
            return cb(null, newuser);
          }
        } catch (error) {
          console.log("Error during Google OAuth callback:", error);
          return cb(error, false, { message: "An error occurred during authentication." });
        }
      }
      
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id); 
  });


  passport.deserializeUser(async (id, done) => {
    try {
      const user = await Jobportalsupport.findById(id);
      done(null, user); 
    } catch (err) {
      done(err, null);
    }
  });

};

module.exports = intaialization;
