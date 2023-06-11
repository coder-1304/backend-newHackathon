function createUserCard(user) {
    const element = `
    <div class="person">
        <div class="card">
            <div class="card-content">
                <div class="card-header">${user.fName} ${user.lName}</div>
                <div id="user-email" class="card-body">${user.email}</div>
            </div>
            <div id="addConnectionButton" onclick="addConnection(this.parentNode)" class="button">Add Connection</div>
            </div>
            
    </div>
    `
    return element;
}

function acceptRequest(node) {
    let email = node.querySelector('#email').innerHTML;
    email = email.replace(/\s/g, "");
    acceptRequestAPI(email);
}
function createRequestCard(user) {
    const element = `
    <div class="request">
        <div class="request-header">
            <h3>${user.name}</h3>
            <div class="request-buttons">
                <button onclick="acceptRequest(this.parentNode.parentNode.parentNode)" class="accept-button">Accept</button>
                <button class="reject-button">Reject</button>
            </div>
        </div>
        <p id="email" class="card-body">${user.email}</p>
    </div>
    `
    return element;
}
// <div class="hidden">${user._id}</div>
async function renderSearchResult(data) {
    // main.innerHTML='';
    document.getElementById('results-container').innerHTML = ''
    for (let i = 0; i < data.length; i++) {
        const main = document.getElementById('results-container');
        // const friend = data[i];
        let card = document.createElement('div');
        let projectCard = await createUserCard(data[i])
        card.innerHTML += projectCard;
        main.appendChild(card);
    }
}

function searchUser() {
    const name = document.getElementById('name-input').value;
    const email = document.getElementById('email-input').value;
    console.log(name)
    console.log(email)
    const data = {
        name: name,
        email: email
    }
    console.log(data);
    fetch('/searchConnection', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            renderSearchResult(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}



function addConnection(node) {
    let content = node.querySelector('.card-content');
    let email = content.querySelector('#user-email').innerHTML;
    email = email.replace(/\s/g, "");
    console.log(email);
    sendConnectionRequest(email)
    const button = document.getElementById('addConnectionButton');
    button.innerHTML = 'Request Sent'
    button.style.backgroundColor = '#82c184';
}


async function sendConnectionRequest(email) {
    var url = "/sendConnectionRequest";
    var data = {
        email: email
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            console.log("Response:", result);
        })
        .catch(error => {
            console.error("Error:", error);
        });

}


async function renderRequests(data) {
    const main = document.getElementById('request-container');
    for (let i = 0; i < data.length; i++) {
        let card = document.createElement('div');
        let projectCard = createRequestCard(data[i]);
        card.innerHTML += projectCard;
        main.appendChild(card);
    }
}


function fetchConnectionReq() {
    const name = document.getElementById('name-input').value;
    const email = document.getElementById('email-input').value;
    console.log(name)
    console.log(email)
    const data = {
        name: name,
        email: email
    }
    console.log(data);
    fetch('/connectionReq')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            renderRequests(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

fetchConnectionReq();


async function acceptRequestAPI(email) {
    var url = "/acceptConnectionRequest";
    var data = {
        email: email
    };
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            console.log("Response:", result);
            location.reload();
        })
        .catch(error => {
            console.error("Error:", error);
        });

}


function createConnectionCard(connection){
   const element = `
   <div class="connection">
   <div class="connection-header">
       <h3>${connection.name}</h3>
   </div>
   <p class="card-body">${connection.email}</p>
</div>
   `
   return element;
}
async function showConnections(data) {

    document.getElementById('results-container').innerHTML = ''
    for (let i = 0; i < data.length; i++) {
        const main = document.getElementById('connections-container');
        // const friend = data[i];
        let card = document.createElement('div');
        let projectCard = createConnectionCard(data[i])
        card.innerHTML += projectCard;
        main.appendChild(card);
    }

}

async function fetchConnections() {
    await fetch('/fetchConnections')
        .then(response => response.json())
        .then(data => {
            console.log('Connections are:')
            console.log(data);
            showConnections(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
fetchConnections()