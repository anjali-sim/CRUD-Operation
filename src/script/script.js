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

  /**
 * @function displayData
 * @description to display the data in the table format
 * @params void
 * @returns void
 * Examples :
 * - If the user adds the data and submits the form, then that data is displayed in the table
 */
function displayData() {
    let productList;
    if (localStorage.getItem("productList") == null) {
      productList = [];
    } else {
      productList = JSON.parse(localStorage.getItem("productList"));
  
      let result = "";
  
      productList.forEach(function (element, index) {
          result += "<tr>";
          result += "<td>" + element.id + "</td>";
          result += "<td>" + element.name + "</td>";
          result +=
          `<td> <img src=` +
          element.image +
          ` style="width:100%;height:98%"> </td>`;
          result += "<td>" + element.price + "</td>";
          result += "<td>" + element.description + "</td>";
          result +=
          '<td><button onclick="updateData(' +
          index +
          ')" class="btn btn-warning mb-2">Edit</button>&emsp;<button onclick="deleteData(' +
          index +
          ')" class="btn btn-danger mb-2">Delete</button></td>';
          result += "</tr>";
      });
  
      document.querySelector("#crudTable tbody").innerHTML = result;
    }
  }
  
  // Loads all data when document or page is loaded
  document.onload = displayData();
  
  /**
   * @function addData
   * @description to store the data in the local storage
   * @params void
   * @returns void
   * Examples :
   * - The data entered by the user gets stored in the local storage and through displayData the data is displayed in the table
   */
  async function addData() {
    if (validateForm() == true) {
      const id = Math.floor(Math.random() * 1000);
      const name = document.getElementById("name").value;
      const image = await convertBase64(document.getElementById("image").files[0]);
      const price = document.getElementById("price").value;
      const description = document.getElementById("description").value;
  
      let productList;
      if (localStorage.getItem("productList") == null) {
        productList = [];
      } else {
        productList = JSON.parse(localStorage.getItem("productList"));
      }
      productList.push({
        id: id,
        name: name,
        image: image,
        price: price,
        description: description,
      });
  
      localStorage.setItem("productList", JSON.stringify(productList));
      displayData();
      document.getElementById("id").value = "";
      document.getElementById("name").value = "";
      document.getElementById("image").value = "";
      document.getElementById("price").value = "";
      document.getElementById("description").value = "";
    }
  }
  
/**
 * @function deleteData
 * @description to delete the data from the local storage
 * @param {*} index
 * @returns void
 */
function deleteData(index) {
    let productList;
    if (localStorage.getItem("productList") == null) {
      productList = [];
    } else {
      productList = JSON.parse(localStorage.getItem("productList"));
    }
  
    productList.splice(index, 1);
    localStorage.setItem("productList", JSON.stringify(productList));
    displayData();
  }

  /**
 * @function updateData
 * @description to update the data from the local storage
 * @param {*} index
 * @returns void
 * Examples :
 * - If the user has changed any particular input field, then it will be updated and stored in the local storage and will be displayed in the table
 */
async function updateData(index) {
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";
    var productList;
    if (localStorage.getItem("productList") == null) {
      productList = [];
    } else {
      productList = JSON.parse(localStorage.getItem("productList"));
    }
  
    document.getElementById("id").value = productList[index].id;
    document.getElementById("name").value = productList[index].name;
    document.getElementById("price").value = productList[index].price;
    document.getElementById("description").value = productList[index].description;
  
    document.querySelector("#update").onclick = async function () {
      if (validateForm() == true) {
        productList[index].id = document.getElementById("id").value;
        productList[index].name = document.getElementById("name").value;
        productList[index].price = document.getElementById("price").value;
        productList[index].description =
          document.getElementById("description").value;
        productList[index].image = await convertBase64(
          document.getElementById("image").files[0]
        );
  
        localStorage.setItem("productList", JSON.stringify(productList));
        displayData();
  
        document.getElementById("id").value = "";
        document.getElementById("name").value = "";
        document.getElementById("price").value = "";
        document.getElementById("description").value = "";
  
        //update button will hide and submit button will be shown
        document.getElementById("submit").style.display = "block";
        document.getElementById("update").style.display = "none";
      }
    };
  }
  