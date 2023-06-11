document.addEventListener("DOMContentLoaded", function () {
  // Get elements
  const taskNameElement = document.getElementById("task-name");
  const taskDescriptionElement = document.getElementById("task-description");
  const taskBannerElement = document.getElementById("task-banner");
  const assignedPersonElement = document.getElementById("assigned-person");
  const editButton = document.getElementById("edit-button");
  const saveButton = document.getElementById("save-button");
  const modalSaveButton = document.getElementById("modal-save-button");
  const taskModal = new bootstrap.Modal(document.getElementById("task-modal"));
  // Add event listeners
  editButton.addEventListener("click", function () {
    // Populate form inputs with current values
    document.getElementById("task-name-input").value = taskNameElement.textContent;
    document.getElementById("task-description-input").value = taskDescriptionElement.textContent;
    document.getElementById("task-banner-input").value = "";
    // document.getElementById("task-banner-preview").style.display = "none";
    assignedPersonElement.textContent = assignedPersonElement.textContent.replace("Assigned Person: ", "");

    // Show the modal
    taskModal.show();
  });

  modalSaveButton.addEventListener("click", function () {
    // Update task details with form input values
    taskNameElement.textContent = document.getElementById("task-name-input").value;
    taskDescriptionElement.textContent = document.getElementById("task-description-input").value;
    // assignedPersonElement.textContent = "Assigned Person: " + document.getElementById("assigned-person-input").value;

    // Get attachments
    const attachmentsInput = document.getElementById("attachments-input");
    // const attachments = Array.from(attachmentsInput.files);

    // // Display attachments
    // const attachmentsPreview = document.getElementById("attachments-preview");
    // attachmentsPreview.innerHTML = "";

    // attachments.forEach((attachment) => {
    //   const attachmentItem = document.createElement("div");
    //   attachmentItem.classList.add("attachment-item");

    //   // Display media attachments (images and videos)
    //   if (attachment.type.startsWith("image/") || attachment.type.startsWith("video/")) {
    //     const attachmentPreview = document.createElement("img");
    //     attachmentPreview.src = URL.createObjectURL(attachment);
    //     attachmentPreview.alt = "Attachment Preview";
    //     attachmentItem.appendChild(attachmentPreview);
    //   }
    //   // Display download link for other file types
    //   else {
    //     const attachmentLink = document.createElement("a");
    //     attachmentLink.href = URL.createObjectURL(attachment);
    //     attachmentLink.textContent = attachment.name;
    //     attachmentLink.download = attachment.name;
    //     attachmentItem.appendChild(attachmentLink);
    //   }

    //   attachmentsPreview.appendChild(attachmentItem);
    // });

    // Hide the modal
    taskModal.hide();
  });

  saveButton.addEventListener("click", function () {
    // Perform save action
    console.log("Save button clicked");
  });
});


async function getTaskDetails() {
  const taskDetails = await fetch('/taskDetails')
    .then(response => response.json())
    .then(async (data) => {
      const taskNameElement = document.getElementById("task-name");
      const taskDescriptionElement = document.getElementById("task-description");
      const assignedPersonElement = document.getElementById("assigned-person");

      taskNameElement.innerHTML = data.name;
      taskDescriptionElement.innerHTML = data.description;
      assignedPersonElement.innerHTML = `Project Owner: ${data.ownerName}`
      document.getElementById('taskBanner').src= data.banner
      renderComments(data.discussion);
    })
    .catch(error => {
      console.error('Error:', error);
    });

}
getTaskDetails();


async function updateTaskDetails() {
  const name = document.getElementById('task-name-input').value;
  const description = document.getElementById('task-description-input').value;
  const fileInput = document.getElementById('task-banner-input');
  var file = fileInput.files[0];
  var formData = new FormData();
  formData.append('file', file);
  formData.append('name', name);
  formData.append('description', description);

  fetch('/updateTaskDetails', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the backend
      console.log(data);
      location.reload();
    })
    .catch(error => {
      // Handle any errors that occur during the request
      console.error('Error:', error);
    });
}