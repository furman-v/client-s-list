function displayData(clientsList = clients) {
  const ul = document.querySelector("#clientsData");
  clientsList.forEach((client) => {
    ul.appendChild(getLiElement(client));
  });
  sumUp(clientsList);
}
function getLiElement(client) {
  const newLi = document.createElement("li");
  newLi.className = "media";
  const avatar = document.createElement("img");
  avatar.className = "mr-3 align-self-center";

  avatar.setAttribute("src", client.avatar);

  newLi.appendChild(avatar);
  newLi.appendChild(mainInfo(client));
  return newLi;
}
function mainInfo(client) {
  const div = document.createElement("div");
  div.className = "media-body";
  const text1 = document.createTextNode(
    `${client.lastName} ${client.firstName} `
  );
  const email = document.createElement("a");
  email.setAttribute("href", `mailto :  ${client.email}`);
  email.innerHTML = client.email;
  const text2 = document.createTextNode(
    `  ${client.gender} (${client.date} - ${client.amount})`
  );
  div.appendChild(text1);
  div.appendChild(email);
  div.appendChild(text2);
  return div;
}
function sortedClients(name) {
  const sorted = clients.sort((currentClient, nextClient) => {
    return name == "ascending"
      ? currentClient.lastName > nextClient.lastName
        ? 1
        : -1
      : currentClient.lastName < nextClient.lastName
      ? 1
      : -1;
  });
  updateData(sorted);
}
function updateData(refreshedClients) {
  clearedLi();
  displayData(refreshedClients);
}
function clearedLi() {
  const ul = document.querySelector("#clientsData");
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}
function filteredClients() {
  const inputDatum = document
    .querySelector("#inputData")
    .value.toLowerCase()
    .trim();
  if (inputDatum) {
    const filteredClients = clients.filter((client) => {
      return (
        client.firstName.toLowerCase().includes(inputDatum) ||
        client.lastName.toLowerCase().includes(inputDatum) ||
        client.email.toLowerCase().includes(inputDatum)
      );
    });
    updateData(filteredClients);
    displayMode(filteredClients);
    // if (filteredClients.length == 0) {
    //   noResultsSection();
    // } else {
    //   normalListSection();
    // }
  } else {
    updateData(clients);

    // normalListSection();
  }
}
function sumUp(clientsList = clients) {
  const totalAmount = clientsList.reduce((amount, client) => {
    return amount + removeCurrency(client.amount);
  }, 0);
  document.getElementById("money").innerHTML = totalAmount.toFixed(2);
}
function removeCurrency(amount) {
  return Number(amount.slice(1));
}
// function noResultsSection() {
//   document.querySelector(".normalList").style.display = "none";
//   document.querySelector(".nothingFound").style.display = "block";
// }
// function normalListSection() {
//   document.querySelector(".normalList").style.display = "block";
//   document.querySelector(".nothingFound").style.display = "none";
// }
function displayMode(filteredClients) {
  if (filteredClients.length == 0) {
    document.querySelector(".normalList").style.display = "none";
    document.querySelector(".nothingFound").style.display = "block";
  } else {
    document.querySelector(".normalList").style.display = "block";
    document.querySelector(".nothingFound").style.display = "none";
  }
}
function maleClients() {
  const male = clients.filter((client) => {
    if (client.gender == "Male") return client;
  });
  updateData(male);
}
function femaleClients() {
  const female = clients.filter((client) => {
    if (client.gender == "Female") return client;
  });
  updateData(female);
}
