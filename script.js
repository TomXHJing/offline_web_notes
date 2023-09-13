// Event listener for saving notes
document.getElementById('saveNote').addEventListener('click', function() {
    const noteContent = document.getElementById('noteArea').value;
    const timestamp = new Date().getTime();
    localStorage.setItem(timestamp, noteContent);
    displayNotes();
});

// Display saved notes from local storage
function displayNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';

    // Extract keys and sort them in descending order (newest first)
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i));
    }
    keys.sort((a, b) => b - a);

    // Iterate over sorted keys to display notes
    keys.forEach(key => {
        const value = localStorage.getItem(key);

        // Convert the timestamp to a readable date-time format
        const date = new Date(Number(key));
        const formattedDate = date.toLocaleDateString() + " " + date.toLocaleTimeString();

        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.innerHTML = `
            <p>${value}</p>
            <span class="timestamp">${formattedDate}</span>
            <button onclick="deleteNote('${key}')">✖</button>
        `;
        notesList.appendChild(noteDiv);
    });
}

// Delete a note by its key
function deleteNote(key) {
    localStorage.removeItem(key);
    displayNotes();
}

// Initial display of notes when the app loads
displayNotes();
