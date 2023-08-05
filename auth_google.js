const { getAuth, signInWithPopup, GoogleAuthProvider } = require( "firebase/auth");

const provider = new GoogleAuthProvider();
const { auth } = require("./config/firebase.js");

async function doLogin(){
    signInWithPopup(auth, provider)
.then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
}).catch((error) => {   
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(errorMessage);
});
}


module.exports = { doLogin };