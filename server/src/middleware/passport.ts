import {PassportStatic}from 'passport'
import passportJwt, { ExtractJwt } from 'passport-jwt'


const JwtStrategy = passportJwt.Strategy


const applyPassportStrategy = (passport:PassportStatic ) => {
    const options = {
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey:'1234567'
    };
    passport.use(
      new JwtStrategy(options, (payload, done) => {
        const {sub,iat,exp} = payload
        if(exp && sub){
            const duration =Math.floor((Date.now()-exp)/(1000*60))
            console.log(duration)
            if(duration<5){
                done(null,sub)
            }else{
                done(new Error('JWT expired'),false)
            }
        }else{
            done(new Error('payload is null'),false)
        }
        
      })
    );
  };

  export default applyPassportStrategy