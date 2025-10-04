class NoteForm extends HTMLElement {
  constructor() {
    super();

 
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this._shadowRoot
      .querySelector('form')
      .addEventListener('submit', this._handleSubmit.bind(this));
  }

  _handleSubmit(event) {
    event.preventDefault();

    const title = this._shadowRoot.querySelector('#noteTitle').value;
    const body = this._shadowRoot.querySelector('#noteBody').value;

    if (title && body) {
      const newNoteEvent = new CustomEvent('newNoteAdded', {
        detail: { title, body },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(newNoteEvent);

      this._shadowRoot.querySelector('form').reset();
    }
  }

  render() {
    this._shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: #fff;
          padding: 2rem;
          margin-bottom: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h2 {
          margin-top: 0;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        input, textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-sizing: border-box; /* Ensures padding doesn't affect width */
          font-family: inherit;
          font-size: 1rem;
        }
        button {
          padding: 12px 15px;
          border: none;
          background-color: #e67e22; /* Warna oranye seperti di gambar */
          color: white;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.2s;
        }
        button:hover {
          background-color: #d35400;
        }
      </style>
      
      <h2>Buat Catatan Baru</h2>
      <form id="addNoteForm">
        <input type="text" id="noteTitle" placeholder="Judul" required>
        <textarea id="noteBody" placeholder="Isi catatan..." rows="5" required></textarea>
        <button type="submit">Tambah Catatan</button>
      </form>
    `;
  }
}

customElements.define('note-form', NoteForm);
