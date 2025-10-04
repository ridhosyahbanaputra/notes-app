class NoteItem extends HTMLElement {
  _note = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });

    this._shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: #fff;
          padding: 15px;
          border-radius: 5px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          animation: fadeIn 0.5s ease-in-out;
          word-wrap: break-word; /* Memastikan teks tidak keluar dari kotak */
        }
        h3 { 
          margin-top: 0; 
        }
        p { 
          margin-bottom: 1rem; 
        }
        .note-actions {
          display: flex;
          gap: 8px;
          margin-top: auto; /* Mendorong tombol ke bawah jika konten pendek */
        }
        button {
          flex: 1;
          border: none;
          padding: 8px;
          border-radius: 4px;
          color: white;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.2s;
        }
        .archive-button { background-color: #e67e22; }
        .archive-button:hover { background-color: #e8b078ff; }
        .delete-button { background-color: #a8372bff; }
        .delete-button:hover { background-color: #cc4c3dff; }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      </style>
      
      <h3></h3>
      <p></p>
      <div class="note-actions">
        <button class="archive-button"></button>
        <button class="delete-button">Hapus</button>
      </div>
    `;
  }

  set note(note) {
    this._note = note;
    this._updateContent(); 
  }

  connectedCallback() {
    this._shadowRoot
      .querySelector('.archive-button')
      .addEventListener('click', this._handleArchiveClick);
    this._shadowRoot
      .querySelector('.delete-button')
      .addEventListener('click', this._handleDeleteClick);
  }

  _updateContent() {
    if (!this._note) return;

    this._shadowRoot.querySelector('h3').textContent = this._note.title;
    this._shadowRoot.querySelector('p').textContent = this._note.body;
    this._shadowRoot.querySelector('.archive-button').textContent = this._note
      .archived
      ? 'Pindahkan'
      : 'Arsipkan';
  }

  _handleArchiveClick = () => {
    const event = new CustomEvent('archiveNote', {
      detail: { noteId: this._note.id, isArchived: this._note.archived },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  };

  _handleDeleteClick = () => {
    const event = new CustomEvent('deleteNote', {
      detail: { noteId: this._note.id },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  };
}

if (!customElements.get('note-items')) {
  customElements.define('note-items', NoteItem);
}
