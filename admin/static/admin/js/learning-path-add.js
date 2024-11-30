  // Show or hide popup based on input
  function showPopup() {
    const input = document.getElementById('searchInput');
    const popup = document.getElementById('popup');
    if (input.value.trim() !== '') {
        popup.style.display = 'block';
    } else {
        popup.style.display = 'none';
    }
}

// Add item to day-box and remove from popup
function addItemToDayBox(item) {
    const studyPlan = document.getElementById('learningPath');
    const dayBox = document.createElement('div');
    dayBox.className = 'day-box';
    dayBox.innerHTML = `<h2>${item.textContent}</h2>`;
    studyPlan.appendChild(dayBox);

    // Remove the clicked item from the popup
    item.remove();

    // Hide popup if it's empty
    const popup = document.getElementById('popup');
    if (popup.childElementCount === 0) {
        popup.style.display = 'none';
    }
}