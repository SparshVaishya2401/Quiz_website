const myModel = document.querySelectorAll('.modal')



async function signup(e){
    e.preventDefault()
    const email  = document.querySelector('#signupEmail')
    const password  = document.querySelector('#signupPassword')
    const name = document.getElementById("userNameSign")
    try{
      const result = await firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
      await result.user.updateProfile({
        displayName: document.getElementById("userNameSign").value,
        
        
      })
      createUserCollection(result.user)
      // await result.user.sendEmailVerification()
      M.toast({html:`welcome ${name.value}`,classes:"green"})
      
     console.log(result)  
    }catch(err){
        console.log(err)
        M.toast({html: err.message,classes:"red"})
    }
    email.value = ""
    password.value = ""
    M.Modal.getInstance(myModel[0]).close()
    
}
async function login(e){
    e.preventDefault()
    const email  = document.querySelector('#loginEmail')
    const password  = document.querySelector('#loginPassword')
    const name = document.getElementById("userNameSign")
    
    try{
      const result = await firebase.auth().signInWithEmailAndPassword(email.value, password.value)
      M.toast({html:`welcome ${name.value}`,classes:"rounded green"})
    
     console.log(result)  
    }catch(err){
        console.log(err)
        M.toast({html: err.message,classes:"red"})
    }
    email.value = ""
    password.value = ""
    M.Modal.getInstance(myModel[1]).close()
}


function logout(){
    firebase.auth().signOut()
    window.location.reload();
    
    document.querySelector('#proimg').src= "./assets/noimage.png"
}

const unsubscribe  = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user)
      // getuserInfo(user.uid)
      document.querySelector(".welcome_box").style.display = "none"
      document.querySelector(".border_box").style.display = "block"
      document.querySelector(".start_btn button").style.display ="block"
      document.querySelector(".about_btn button").style.display ="block"
      document.getElementById("loginli").style.display = "none"
      document.getElementById("signupli").style.display = "none"
      document.getElementById("logoutli").style.display = "block"
      getuserInfoRealtime(user.uid)
      if(user.uid=='TSS0ckznnpM2UkjxHIxp2Y8ivFc2'){
        allUserDetails()
      }
     
    
    } else {
      getuserInfoRealtime(null)
      console.log('signout success')
      document.querySelector(".welcome_box").style.display = "block"
      document.querySelector(".border_box").style.display = "none"
      document.querySelector(".start_btn button").style.display = "none"
      document.querySelector(".about_btn button").style.display = "none"
      document.getElementById("logoutli").style.display = "none"
      document.getElementById("loginli").style.display = "block"
      document.getElementById("signupli").style.display = "block"
       M.toast({html: "signout success",classes:"rounded green"})
    }
  });



// with google
async function loginWithGoogle(){
    try{
      var provider = new firebase.auth.GoogleAuthProvider();
    const result =  await firebase.auth()
    .signInWithPopup(provider)  
    console.log(result)
    }catch(err){
        console.log(err)
    }
    M.Modal.getInstance(myModel[0]).close()
    M.Modal.getInstance(myModel[1]).close()
}