function addVision() {
    let goalText = document.getElementById('goal').value;
    let imageInput = document.getElementById('imageInput');
    
    if (goalText && imageInput.files.length > 0) {
        let board = document.getElementById('board');
        let item = document.createElement('div');
        item.className = 'vision-item';
        
        let reader = new FileReader();
        reader.onload = function(event) {
            item.innerHTML = `<img src="${event.target.result}" alt="Vision Image">
                              <p>${goalText}</p>
                              <button class='remove-btn' onclick="removeVision(this)">Remove</button>`;
            board.appendChild(item);
        };
        reader.readAsDataURL(imageInput.files[0]);
        
        document.getElementById('goal').value = '';
        imageInput.value = '';
    } else {
        alert('Please enter a vision goal and select an image.');
    }
}

function removeVision(button) {
    button.parentElement.remove();
}