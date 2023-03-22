// for selecting all elements having button as class
const buttons = document.querySelectorAll(".button");

// for storing the product data
let productList;

/**
 * @function convertBase64
 * @description to convert the contents of the file to a base64-encoded string
 * @param {*} file
 * @returns promise object
 */
const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

// for traversing through all the buttons and adding an eventlistener to them to remain selected on clicking on it until another button is selected
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => {
      if (btn !== button) {
        btn.classList.remove("selected");
      }
    });
    button.classList.add("selected");
  });
});

// for getting the data from the local storage
// if the local storage is null then assign an empty array to productList
// else return a string that contains the stored data in local storage
if (localStorage.getItem("productList") === null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem("productList"));
}

// if the productList array's length is 0 then display NO DATA FOUND message in the table
// else display the data of the products in tabular form
if (productList.length === 0) {
  document.getElementById("noData").innerHTML = "NO DATA FOUND";
} else {
  document.getElementById("noData").innerHTML = "";
  displayData();
}

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
  
    if (name === "") {
      nameWarning.innerText = "Name is Required.";
      document.getElementById("nameWarning").style.color = "red";
      return false;
    }
    nameWarning.innerHTML = '<i class="fa-sharp fa-regular fa-circle-check"></i>';
  
    if (price === "") {
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
  
    if (price === 0) {
      document.getElementById("priceWarning").innerText =
        "Price must not start with zero(0).";
      document.getElementById("priceWarning").style.color = "red";
      return false;
    }
    priceWarning.innerHTML =
      '<i class="fa-sharp fa-regular fa-circle-check"></i>';
  
    if (description === "") {
      document.getElementById("descriptionWarning").innerText =
        "Description is Required.";
      document.getElementById("descriptionWarning").style.color = "red";
      return false;
    }
    descriptionWarning.innerHTML =
      '<i class="fa-sharp fa-regular fa-circle-check"></i>';
  
    if (image === "") {
      document.getElementById("imageWarning").innerText = "Image is Required.";
      document.getElementById("imageWarning").style.color = "red";
      return false;
    }
    const extension = image.split(".").pop().toLowerCase();
  
    // Check if the file extension is valid
    if (
      !(
        extension === "jpg" ||
        extension === "jpeg" ||
        extension === "png" ||
        extension === "gif" 
      )
    ) {
      document.getElementById("imageWarning").innerText =
        "Image must be of valid extension.";
      document.getElementById("imageWarning").style.color = "red";
      return false;
    }
  
    const fileInput = document.getElementById("image");
    const file = fileInput.files[0];
    const fileSizeKB = file.size / 1024;
    if(fileSizeKB > 1024){
      document.getElementById("imageWarning").innerText =
      "Image Size must be of less than 1 Mb.";
    document.getElementById("imageWarning").style.color = "red";
    return false;
    }
  
    imageWarning.innerHTML =
      '<i class="fa-sharp fa-regular fa-circle-check"></i>';
    return true;
  }

  /**
   * @function clearValidation
   * @description to clear the validation on adding or updating
   * @params void
   * @returns void
   */
  function clearValidation(){
    document.getElementById("nameWarning").innerHTML = "";
    document.getElementById("priceWarning").innerHTML = "";
    document.getElementById("descriptionWarning").innerHTML = "";
    document.getElementById("imageWarning").innerHTML = "";
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
  if (localStorage.getItem("productList") === null) {
    productList = [];
  } else {
    productList = JSON.parse(localStorage.getItem("productList"));
    // for displaying the product data in the table
    let result = "";
    productList.forEach(function (element, index) {
      result += "<tr>";
      result += "<td>" + element.id + "</td>";
      result += "<td>" + element.name + "</td>";
      result +=
        `<td> <img src=` +
        element.image +
        ` style="width:80%;height:70%;"> </td>`;
      result += "<td>" + element.price + "</td>";
      result += "<td>" + element.description + "</td>";
      result +=
        '<td><button onclick="updateData(' +
        index +
        ')" class="btn btn-warning mb-2 w-75">Edit</button>&emsp;<button onclick="deleteData(' +
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
 * @description to store the data in the local storage and display it in the table
 * @params void
 * @returns void
 * Examples :
 * - The data entered by the user gets stored in the local storage and through displayData function the data is displayed in the table
 */
async function addData() {
  if (validateForm() === true) {
    const id = Math.floor(Math.random() * 1000);
    const name = document.getElementById("name").value;
    const image = await convertBase64(
      document.getElementById("image").files[0]
    );
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;

    let productList;
    if (localStorage.getItem("productList") === null) {
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

    productList = JSON.parse(localStorage.getItem("productList"));

    if (productList.length === 0) {
      document.getElementById("noData").innerHTML = "NO DATA FOUND";
    } else {
      document.getElementById("noData").innerHTML = "";
      displayData();
    }
    clearValidation();
  }
}

/**
 * @function deleteData
 * @description to delete the data from the local storage
 * @param {*} index
 * @returns void
 */

function deleteData(index) {
  if (confirm("Are you sure you want to delete this product?") === true) {
    let productList;
    if (localStorage.getItem("productList") === null) {
      productList = [];
    } else {
      productList = JSON.parse(localStorage.getItem("productList"));
    }

    productList.splice(index, 1);
    localStorage.setItem("productList", JSON.stringify(productList));
    displayData();

    productList = JSON.parse(localStorage.getItem("productList"));

    // for displaying the NO DATA FOUND message if all the product items are deleted from the table
    if (productList.length === 0) {
      document.getElementById("noData").innerHTML = "NO DATA FOUND";
    } else {
      document.getElementById("noData").innerHTML = "";
      displayData();
    }
  } else {
    displayData();
  }
}

/**
 * @function updateData
 * @description to update the data in the form and local storage and on updating it, display the updated data in the table
 * @param {*} index
 * @returns void
 * Examples :
 * - If the user has changed any particular input field, then the data will be updated and stored in the local storage and will be displayed in the table
 */
async function updateData(index) {
    clearValidation();
  document.getElementById("submit").style.display = "none";
  document.getElementById("update").style.display = "block";
  var productList;
  if (localStorage.getItem("productList") === null) {
    productList = [];
  } else {
    productList = JSON.parse(localStorage.getItem("productList"));
  }

  document.getElementById("id").value = productList[index].id;
  document.getElementById("name").value = productList[index].name;
  document.getElementById("price").value = productList[index].price;
  document.getElementById("description").value = productList[index].description;

  document.querySelector("#update").onclick = async function () {
    if (validateForm() === true) {
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
  clearValidation();
}

/**
 * @function displaySearchedData
 * @description to display only the searched data in the table
 * @param {*} products
 * @returns void
 * Examples :
 * - If the user entered a particular product name, then only that data will be displayed in the table
 */
function displaySearchedData(products) {
  let obj = products;
  var result = "";
  products.forEach(function (element, index) {
    result += "<tr>";
    result += "<td>" + element.id + "</td>";
    result += "<td>" + element.name + "</td>";
    result +=
      `<td> <img src=` + element.image + ` style="width:80%;height:70%"> </td>`;
    result += "<td>" + element.price + "</td>";
    result += "<td>" + element.description + "</td>";
    result +=
      '<td><button onclick="updateData(' +
      index +
      ')" class="btn btn-warning mb-3 w-75">Edit</button>&emsp;<button onclick="deleteData(' +
      index +
      ')" class="btn btn-danger">Delete</button></td>';
    result += "</tr>";
  });
  document.querySelector("#crudTable tbody").innerHTML = result;
  //   document.getElementById("products-display").innerHTML = data;
}

/**
 * @function searchProductLists
 * @description to search a particular product from the list in the local storage and display only the matched product in the table
 * @params void
 * @returns void
 * Examples :
 * - If the user have entered 'aa' in the search bar, then this function will search for 'aa' in the local storage
 */
function searchProductLists() {
  const search_val = document.getElementById("searchProduct").value;
  console.log(search_val);
  let searchItem = [];
  let products = JSON.parse(localStorage.getItem("productList")) ?? [];
  let regex = new RegExp(search_val, "i");
  for (let element of products) {
    const item = element;
    if (regex.test(item.name)) {
      searchItem.push(element);
    }
  }
  // if the length of searchItem array is zero, then display NO DATA FOUND message in the table
  // else display the searched item based on the input in the search bar
  if (searchItem.length === 0) {
    document.querySelector("#crudTable tbody").innerHTML = "NO DATA FOUND";
  } else {
    console.log(searchItem);
    displaySearchedData(searchItem);
    searchItem = [];
  }
  if (productList.length === 0) {
    document.getElementById("noData").innerHTML = "";
  }
}

/**
 * @function sortItems
 * @description to sort the items in the productList array based on the selected sort value (productid, productname, or price) and display the products in that order
 * @param {*} sortvalue 
 * @returns void
 */
function sortItems(sortvalue) {
  let products = JSON.parse(localStorage.getItem("productList")) ?? [];
  console.log(products);
  if (sortvalue === "productid") {
    products = products.sort((a, b) => a.id - b.id);
  } else if (sortvalue === "productname") {
    products = products.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    products = products.sort((a, b) => a.price - b.price);
  }
  localStorage.setItem("productList", JSON.stringify(products));
  console.log(products);
  displayData();
}
