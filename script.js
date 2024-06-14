function showDetails(imageId) {
    const detailsElement = document.getElementById(`${imageId}-details`);
    if (detailsElement.style.display === 'block') {
        detailsElement.style.display = 'none';
    } else {
        detailsElement.style.display = 'block';
    }
}