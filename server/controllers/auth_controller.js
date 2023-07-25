const jwt = require("jsonwebtoken");
const auth_middleware = require ('../middleware/auth_middleware')

exports.process_login = (req, res) => {
    const { username, password } = req.body;

    // Find the user with the given username and password in the users array (replace this with a database query)
    const validLogin = auth_middleware.verifyUser(username, password);
    
    if (validLogin) {
      const token = jwt.sign(
        {
            username: username
        },
        "RANDOM-TOKEN",
        { expiresIn: "24h" }
      );

      //   return success response
      res.status(200).send({
        message: "Login Successful",
        username: username,
        token,
      });
    } else {
      // If the user is not found, return an error
      res.status(401).json({ message: 'Invalid credentials' });
    }
};

exports.isAuthenticated = async (req, res, next) => {
    try {
      //   get the token from the authorization header
      const token = await req.headers.authorization.split(" ")[1];
      console.log(req.headers);
  
      //check if the token matches the supposed origin
      const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");
  
      // retrieve the user details of the logged in user
      const user = await decodedToken;
  
      // pass the user down to the endpoints here
      req.user = user;
  
      // pass down functionality to the endpoint
      next();
      
    } catch (error) {
      res.status(401).json({
        error: new Error("Invalid request!"),
      });
    }
  };
  
  