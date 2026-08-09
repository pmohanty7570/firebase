/**
 * @TODO get a reference to the Firebase Database object
 */
const database = firebase.database().ref();
/**
 * @TODO get const references to the following elements:
 *      - div with id #all-messages
 *      - input with id #username
 *      - input with id #message
 *      - button with id #send-btn and the updateDB
 *        function as an onclick event handler
 */
const allMessages = document.getElementById("all-messages");
const usernameElem = document.getElementById("username");
const emailElem = document.getElementById("email");
const messageElem = document.getElementById("message");
const profileElem = document.getElementById("profile");

const sendBtn = document.getElementById("send-btn");

sendBtn.onclick = updateDB;


/**
 * @TODO create a function called updateDB which takes
 * one parameter, the event, that:
 *      - gets the values of the input elements and stores
 *        the data in a temporary object with the keys USERNAME
 *        and MESSAGE
 *      - console.logs the object above
 *      - writes this object to the database
 *      - resets the value of #message input element
 */

function updateDB(event) {
  // Prevent default refresh
  event.preventDefault();
  // Create data object
  const date = new Date();

  const data = {
    PROFILE: profileElem.value,
    USERNAME: usernameElem.value,
    EMAIL: emailElem.value,
    MESSAGE: messageElem.value,
    DATE: (date.getMonth() + 1) + "/" + (date.getDate()) + "/" + (date.getFullYear()),
    TIME: (date.getHours()) + ":" + (date.getMinutes()) + ":" + (date.getSeconds()),
  }
  // console.log the object
  // GET *PUSH* PUT DELETE
  // Write to our database
  database.push(data);
  // Reset message
  messageElem.value = "";
}

/**
 * @TODO add the addMessageToBoard function as an event
 * handler for the "child_added" event on the database
 * object
 */
database.on('child_added', addMessageToBoard);
/**
 * @TODO create a function called addMessageToBoard that
 * takes one parameter rowData which:
 *      - console.logs the data within rowData
 *      - creates a new HTML element for a single message
 *        containing the appropriate data
 *      - appends this HTML to the div with id
 *        #all-messages (we should have a reference already!)
 *
 */

function addMessageToBoard(rowData) {
  // Store the value of rowData inside object named 'data'
  const data = rowData.val();
  // console.log data
  console.log(data);
  // Create a variable named singleMessage
  let singleMessage = makeSingleMessageHTML(data.PROFILE, data.USERNAME, data.EMAIL, data.MESSAGE, data.DATE, data.TIME);
  // that stores function call for makeSingleMessageHTML()
  // Append the new message HTML element to allMessages
  allMessages.appendChild(singleMessage);
}

/**
 * @TODO create a function called makeSingleMessageHTML which takes
 * two parameters, usernameTxt and messageTxt, that:
 *      - creates a parent div with the class .single-message
 *
 *      - creates a p tag with the class .single-message-username
 *      - update the innerHTML of this p to be the username
 *        provided in the parameter object
 *      - appends this p tag to the parent div
 *
 *      - creates a p tag
 *      - updates the innerHTML of this p to be the message
 *        text provided in the parameter object
 *      - appends this p tag to the parent div
 *
 *      - returns the parent div
 */

function makeSingleMessageHTML(profileImg, usernameTxt, emailTxt, messageTxt, dateTxt, timeTxt) {
  // Create Parent Div
  let parentDiv = document.createElement('div');
  // Add Class name .single-message
  parentDiv.classList.add("single-message")
  // Create Username P Tag
  let usernamePTag = document.createElement('p');
  // Append username
  usernamePTag.innerHTML = usernameTxt;
  usernamePTag.classList.add("single-message-username");

  let emailPTag = document.createElement('p');
  emailPTag.innerHTML = emailTxt;
  emailPTag.classList.add("single-message-email");
  // Create message P Tag
  let messagePTag = document.createElement('p');
  messagePTag.innerHTML = messageTxt;

  let datePTag = document.createElement('p');
  datePTag.innerHTML = dateTxt;
  datePTag.classList.add("single-message-date");

  let timePTag = document.createElement('p');
  timePTag.innerHTML = timeTxt;
  timePTag.classList.add("single-message-time");

  let profileImgTag = document.createElement('img');
  profileImgTag.src = profileImg;
  profileImgTag.classList.add("single-message-img");

  // Return Parent Div
  parentDiv.appendChild(profileImgTag);
  parentDiv.appendChild(usernamePTag);
  parentDiv.appendChild(emailPTag);
  parentDiv.appendChild(messagePTag);
  parentDiv.appendChild(datePTag);
  parentDiv.appendChild(timePTag);
  return parentDiv;
}

/**
 * @BONUS add an onkeyup event handler to the form HTML
 * element so the user can also submit the form with the
 * Enter key
 *
 * @BONUS use an arrow function
 */