function highlightAllColumnsExcept(status) {
  const columns = document.getElementsByClassName("kanban-column");
  for (let i = 0; i < columns.length; i++) {
    if (columns[i].getAttribute('data-status') == status) continue;
    columns[i].classList.add('dropzone');
  }
}

function unhighlightAllColumns() {
  const columns = document.getElementsByClassName("kanban-column");
  for (let i = 0; i < columns.length; i++) {
    columns[i].classList.remove('dropzone');
  }
}

class KanbanCard extends HTMLElement {
  id;
  title;
  status;
  isDragged;

  constructor() {
    super();
    this.title = this.getAttribute('data-title');
    this.status = this.parentElement.getAttribute('data-status');
    this.isDragged = false;
    this.textContent = this.title;

    const style = document.createElement('style');
    style.textContent = `
      kanban-card {
        display: block; 
        background-color: #e0e0e0;
        margin: 10px 0;
        padding: 10px;
        border-radius: 4px;

        &.is-dragged {
          background-color: yellow;
        }
      }
    `;

    this.appendChild(style);

    this.addEventListener('dragstart', (event) => {
      this.classList.add('is-dragged');
      event.dataTransfer.setData('text/plain', event.target.getAttribute('id'));
      highlightAllColumnsExcept(this.status);
    })

    this.addEventListener('dragend', () => {
      this.classList.remove('is-dragged');
      this.status = this.parentElement.getAttribute('data-status');
      unhighlightAllColumns();
    })
  }
}

customElements.define('kanban-card', KanbanCard);
