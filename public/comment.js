// Function:
// Render comments function
function renderComments(comments) {
    const commentsContainer = document.getElementById('comments');

    // Clear existing comments
    commentsContainer.innerHTML = '';
    document.getElementById('discussion-title').innerHTML = `Discussion (${comments.length})`

    // Loop through the comments array and create comment elements
    comments.forEach(function (commentData) {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');

        const nameElement = document.createElement('p');
        nameElement.classList.add('name');
        nameElement.innerText = commentData.name;

        const commentTextElement = document.createElement('p');
        commentTextElement.innerText = commentData.comment;

        commentElement.appendChild(nameElement);
        commentElement.appendChild(commentTextElement);

        // Check if fileLink is available
        if (commentData.fileLink.length >= 9) {
            const fileLinkElement = document.createElement('a');
            fileLinkElement.classList.add('file-link');
            fileLinkElement.href = commentData.fileLink;
            fileLinkElement.download = commentData.fileLink.substring(commentData.fileLink.lastIndexOf('/') + 1);
            fileLinkElement.innerText = 'Download File';
            commentElement.appendChild(fileLinkElement);
        }
        commentsContainer.appendChild(commentElement);
    });
}
const commentsData = [
    // { "name": "shannee", "comment": "this is an image", "fileLink": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png" },
];

renderComments(commentsData);


// Comment form submission event listener
document.getElementById('comment-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    // const name = document.getElementById('name-input').value;
    const name = 'Shannee Ahirwar';
    const comment = document.getElementById('comment-input').value;
    const file = document.getElementById('file-input').files[0];

    // Create comment element
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');

    // Create name element
    const nameElement = document.createElement('p');
    nameElement.classList.add('name');
    nameElement.innerText = name;

    // Create comment text element
    const commentTextElement = document.createElement('p');
    commentTextElement.innerText = comment;

    // Append name and comment text to comment element
    commentElement.appendChild(nameElement);
    commentElement.appendChild(commentTextElement);

    // Check if file is selected
    if (file) {
        const fileLinkElement = document.createElement('a');
        fileLinkElement.classList.add('file-link');
        fileLinkElement.href = URL.createObjectURL(file);
        fileLinkElement.download = file.name;
        fileLinkElement.innerText = 'Download File';
        commentElement.appendChild(fileLinkElement);
    }

    // Append comment element to comments container
    document.getElementById('comments').appendChild(commentElement);

    // Clear form inputs
    // document.getElementById('name-input').value = '';
    document.getElementById('comment-input').value = '';
    document.getElementById('file-input').value = '';
});

function postComment() {
    const comment = document.getElementById('comment-input').value;
    const fileInput = document.getElementById('file-input');
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append('file', file);
    formData.append('comment', comment);

    fetch('/updateTaskDiscussion', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the backend
            console.log(data);
            // location.reload();
        })
        .catch(error => {
            // Handle any errors that occur during the request
            console.error('Error:', error);
        });
}