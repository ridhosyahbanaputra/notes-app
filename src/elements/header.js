class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        body{
          margin: 0;
          padding: 0;
        }
        main{
          max-width: 1200px;
          margin: 20px auto;
          padding: 1rem; }
        header {
          background-color: #e59646;
          color: white;
          padding: 1rem;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
          margin: 0;
          font-size: 24px;
        }
      </style>
      
      <header>
        <h1>Notes APP</h1>
      </header>
    `;
  }
}
if (!customElements.get('app-header')) {
  customElements.define('app-header', AppHeader);
}
