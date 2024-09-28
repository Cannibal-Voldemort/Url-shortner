const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  // const authorizationHeaderValue = req.headers["authorization"];
  const tokenCookie = req.cookies?.token;
  req.user = null;

  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  return next();
  // if (
  //   !authorizationHeaderValue ||
  //   !authorizationHeaderValue.startsWith("Bearer")
  // )
  // const token = authorizationHeaderValue.split("Bearer ")[1];
  // const user = getUser(token);
}

function restrictTo(roles) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("UnAuthorized");
     return next();
  };
}

module.exports = {
  checkForAuthentication,
  restrictTo,
};

// if you want to understand cookies send in token and response refer to this code

// async function restrictToLoggedinUserOnly(req, res, next) {
//   // const userUid = req.cookies?.uid(basically its sent a req to cookies for uid)
//   const userUid = req.headers["authorization"]; {in this the uid is sent to user only}

//   if (!userUid) return res.redirect("/login");
//   const token = userUid.split("Bearer ")[1]; // "Bearer 34355"(it basically split the bearer part and give the uid or token)
//   const user = getUser(token);
//   // const user = getUser(userUid)(this recall the function from auth where get user check the id of the cookies)

//   if (!user) return res.redirect("/login");

//   req.user = user;
//   next();
// }
// async function checkAuth(req, res, next) {
//   console.log(req.headers);
//   const userUid = req.headers["authorization"];

//   const token = userUid.split("Bearer ")[1]; // "Bearer 34355"

//   const user = getUser(token);
//   // const user = getUser(userUid) used when we store info in cookies

//   req.user = user;
//   next();
// }
