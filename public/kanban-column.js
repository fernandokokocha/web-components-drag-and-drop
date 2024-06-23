function onDragOver(event) {
  event.preventDefault();
}

function onDrop(event) {
  const id = event.dataTransfer.getData('text');
  const draggableElement = document.getElementById(id);
  let dropzone = event.target;
  while (![...dropzone.classList].includes('kanban-column')) {
    dropzone = dropzone.parentElement;
  }
  dropzone.appendChild(draggableElement);

  event.dataTransfer.clearData();
}