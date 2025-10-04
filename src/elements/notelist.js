import './noteitems.js'; 

class NoteList extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });

    this._shadowRoot.innerHTML = `
      <style>
        .notes-list-container {
          background: #fff; /* Ubah background agar kontras */
          padding: 2rem;
          margin-bottom: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .notes-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
        }
        h2 {
          margin-top: 0;
        }
      </style>
      
      <div class="notes-list-container">
        <h2></h2>
        <div class="notes-list"></div>
      </div>
    `;
  }

  set notes({ list, title }) {
    this._renderNotes(list, title);
  }

  _renderNotes(notes, title) {
    const listElement = this._shadowRoot.querySelector('.notes-list');
    const titleElement = this._shadowRoot.querySelector('h2');

    listElement.innerHTML = '';
    titleElement.textContent = title;

    if (notes.length === 0) {
      listElement.innerHTML = '<p>Tidak ada catatan di bagian ini.</p>';
      return;
    }

    notes.forEach((note) => {
      const noteItem = document.createElement('note-items'); 
      noteItem.note = note;
      listElement.appendChild(noteItem);
    });
  }
}

if (!customElements.get('note-list')) {
  customElements.define('note-list', NoteList);
}
