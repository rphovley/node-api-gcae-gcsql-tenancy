import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import passport from 'passport'
import { Request, Response, NextFunction } from 'express'

class Authentication {
  public passport: passport.PassportStatic = passport
  public whiteList: string[] = [
    // Add unprotected endpoints here
    '/api/test',
  ]
  private strategyOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
    issuer: 'accounts.exaplesoft.com',
    audience: 'yoursite.net',
  }

  constructor() {
    this.configurePassport()
  }

  public authMiddleware() {
    return (req: Request, res: Response, next: NextFunction): void => {
      if (this.whiteList.find(x => x === req.url)) {
        return next()
      }
      return this.passport.authenticate('jwt')(req, res, next)
    }
  }

  private configurePassport(): void {
    this.passport.use(new Strategy(this.strategyOptions, (jwtPayload, done) => {
      console.log('passport middleware!', jwtPayload)
    // EXAMPLE
      // User.findOne({id: jwtPayload.sub}, function(err, user) {
      //   if (err) return done(err, false)
      //   if (!user) return done(null, false)
      //   return done(null, user)
      // })
    }))
  }
}

export default new Authentication()
