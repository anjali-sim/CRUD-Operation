/**
 * @function validateForm
 * @description to validate the form inputs before submitting the data
 * @params void
 * @returns boolean
 * Examples :
 * - If any of the field is not entered, then an alert box pops up with the message that the particular field is required.
 * - The price field can only contain numeric values, not less than one(negative numbers) and cannot start with zero(0).
 */
function validateForm() {
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let image = document.getElementById("image").value;
    let price = document.getElementById("price").value;
    let description = document.getElementById("description").value;
  
    if (name == "") {
      nameWarning.innerText = "Name is Required.";
      document.getElementById("nameWarning").style.color = "red";
      return false;
    }
    nameWarning.innerHTML = '<i class="fa-sharp fa-regular fa-circle-check"></i>';
  
    if (price == "") {
      document.getElementById("priceWarning").innerText = "Price is Required.";
      document.getElementById("priceWarning").style.color = "red";
      return false;
    }
  
    if (price < 0) {
      document.getElementById("priceWarning").innerText =
        "Price must be positive.";
      document.getElementById("priceWarning").style.color = "red";
      return false;
    }
  
    if (price.startsWith("0")) {
      document.getElementById("priceWarning").innerText =
        "Price must not start with zero(0).";
      document.getElementById("priceWarning").style.color = "red";
      return false;
    }
  
    if (price == 0) {
      document.getElementById("priceWarning").innerText =
        "Price must not start with zero(0).";
      document.getElementById("priceWarning").style.color = "red";
      return false;
    }
    priceWarning.innerHTML =
      '<i class="fa-sharp fa-regular fa-circle-check"></i>';
  
    if (description == "") {
      document.getElementById("descriptionWarning").innerText =
        "Description is Required.";
      document.getElementById("descriptionWarning").style.color = "red";
      return false;
    }
    descriptionWarning.innerHTML =
      '<i class="fa-sharp fa-regular fa-circle-check"></i>';
  
    if (image == "") {
      document.getElementById("imageWarning").innerText = "Image is Required.";
      document.getElementById("imageWarning").style.color = "red";
      return false;
    }
  
    const extension = image.split('.').pop().toLowerCase();
    
      // Check if the file extension is valid
      if (!(extension === "jpg" || extension === "jpeg" || extension === "png" || extension === "gif")) {
          document.getElementById("imageWarning").innerText = "Image must be of valid extension.";
          document.getElementById("imageWarning").style.color = "red";
          return false;
      }
    
    imageWarning.innerHTML =
      '<i class="fa-sharp fa-regular fa-circle-check"></i>';
    return true;
  }
  