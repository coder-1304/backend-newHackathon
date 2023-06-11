function createProject(project) {
    const element = `

    <div class="card">
    <img class="card-img-top" src="getfile/${project.banner}" alt="Project 1 Banner">
    <div class="card-body">
      <div class="hidden">${project._id}</div>
      <h5 class="card-title">Title: ${project.title}</h5>
      <p class="card-text">Owner: ${project.owner}</p>
      <p class="card-text">Created: January 1, 2023</p>
      <p class="card-text">Description: ${project.description}</p>
      <p class="card-text">Deadline: ${project.deadline}</p>
      <p class="card-text">Status: 5 tasks accomplished</p>
    
      <div onclick="viewMore(this.parentNode)" class="btn btn-primary">View More</div>
    </div>
  </div>
  
  `
// const element = `<h1>title</h1>`;

    return element;
}
{/* <button onclick="viewMore(this.parentNode)">View MOre</button> */}
function viewMore(node){
    const id = node.querySelector(".hidden").textContent;
    // console.log(id);
    window.location.href = `/viewTasks/${id}`
    // fetch(`/viewTasks/${id}`)
    // .then(response => response.json())
    // .then(async(data) => {
    //     data=data.project;
    //     // Handle the JSON response
    //     console.log(data)
    //     for (let i = 0; i < data.length; i++) {
    //         let main = document.getElementById('mainCardsContainer');

    //         console.log('Element is'+main)
    //         //create card
    //         let card = document.createElement('div');
    //         let projectCard = await createProject(data[i])
    //         card.innerHTML += projectCard;
    //         main.appendChild(card);
    //     }
    // })
    // .catch(error => {
    //     // Handle any errors that occur during the request
    //     console.error('Error:', error);
    // });
    // window.location.href = `/project/${id}`;
}

async function fetchProjects() {
    fetch('/fetchProjects')
        .then(response => response.json())
        .then(async(data) => {
            data=data.project;
            // Handle the JSON response
            console.log(data)
            for (let i = 0; i < data.length; i++) {
                let main = document.getElementById('mainCardsContainer');

                console.log('Element is'+main)
                //create card
                let card = document.createElement('div');
                let projectCard = await createProject(data[i])
                card.innerHTML += projectCard;
                main.appendChild(card);
            }
        })
        .catch(error => {
            // Handle any errors that occur during the request
            console.error('Error:', error);
        });
}


fetchProjects()
