const { validateToken } = require("../services/authentication");

function checkForauthenticationCookie(cookieName){
   return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if(!tokenCookieValue){
      return  next();
    }

 try {
    const userpayload = validateToken(tokenCookieValue);
    req.user = userpayload;
 } catch (error) {
    
 }

 return next()

   }
}

module.exports ={
    checkForauthenticationCookie,
}