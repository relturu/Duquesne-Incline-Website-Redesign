function validation() {
    var firstName = document.getElementById("firstName");
    var lastName = document.getElementById("lastName");
    var email = document.getElementById("email");
    var mobile = document.getElementById("mobile");
    var zipcode = document.getElementById("zipcode");
    var msg = document.getElementById("contact_validation-msg");
    
    // checking required fields
    if (firstName.value.trim() == "" || !firstName.checkValidity() || 
        lastName.value.trim() == "" || !lastName.checkValidity() || 
        email.value.trim() == "" || !email.checkValidity()) {
      
      msg.innerHTML = "Please fill out the form correctly. First name, last name, and email are required.<br>(This message will stay until you fix it)";
      msg.style.backgroundColor = "black";
      msg.style.color = "red";
      msg.style.fontSize = "150%";
      msg.style.margin = "5%";
      msg.style.padding = "5%";
      return false;
    }
    
    // zipcode validation if not empty
    if (zipcode.value.trim() !== "" && !zipcode.checkValidity()) {
      msg.innerHTML = "Please enter a valid 5-digit zip code.<br>(This message will stay until you fix it)";
      msg.style.backgroundColor = "black";
      msg.style.color = "red";
      msg.style.fontSize = "150%";
      msg.style.margin = "5%";
      msg.style.padding = "5%";
      return false;
    }
    
    return true;
}