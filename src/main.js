import './style.css';
import './elements/header.js';
import './elements/noteform.js';
import './elements/notelist.js';
import Swal from 'sweetalert2';

const baseUrl = 'https://notes-api.dicoding.dev/v2';
const loadingIndicator = document.querySelector('.loading-indicator');
const activeNotesListElement = document.querySelector(
  'note-list#activeNotesList',
);
const archivedNotesListElement = document.querySelector(
  'note-list#archivedNotesList',
);

const showLoading = () => {
  loadingIndicator.style.display = 'flex';
};

const hideLoading = () => {
  loadingIndicator.style.display = 'none';
};

const showError = (message) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
  });
};

const loadNotes = async () => {
  showLoading();
  try {
    const responseActive = await fetch(`${baseUrl}/notes`);
    const { data: activeNotes } = await responseActive.json();

    activeNotesListElement.notes = {
      list: activeNotes,
      title: 'Daftar Catatan',
    };

    const responseArchived = await fetch(`${baseUrl}/notes/archived`);
    const { data: archivedNotes } = await responseArchived.json();

    archivedNotesListElement.notes = {
      list: archivedNotes,
      title: 'Catatan Diarsipkan',
    };
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
};

const addNote = async (note) => {
  showLoading();
  try {
    const response = await fetch(`${baseUrl}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
    const responseJson = await response.json();
    if (responseJson.status === 'success') {
      Swal.fire({
        icon: 'success',
        title: 'Catatan Ditambahkan!',
        showConfirmButton: false,
        timer: 1500,
      });
      loadNotes();
    } else {
      showError(responseJson.message);
    }
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
};

const deleteNote = async (noteId) => {
  showLoading();
  Swal.fire({
    title: 'Anda yakin?',
    text: 'Catatan yang dihapus tidak dapat dikembalikan!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(`${baseUrl}/notes/${noteId}`, {
          method: 'DELETE',
        });
        const responseJson = await response.json();
        if (responseJson.status === 'success') {
          loadNotes();
          Swal.fire('Dihapus!', 'Catatan Anda telah dihapus.', 'success');
        } else {
          showError(responseJson.message);
        }
      } catch (error) {
        showError(error.message);
      } finally {
        hideLoading();
      }
    }
  });
};

const archiveNote = async (noteId) => {
  showLoading();
  try {
    const response = await fetch(`${baseUrl}/notes/${noteId}/archive`, {
      method: 'POST',
    });
    const responseJson = await response.json();
    if (responseJson.status === 'success') loadNotes();
    else showError(responseJson.message);
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
};

const unarchiveNote = async (noteId) => {
  showLoading();
  try {
    const response = await fetch(`${baseUrl}/notes/${noteId}/unarchive`, {
      method: 'POST',
    });
    const responseJson = await response.json();
    if (responseJson.status === 'success') loadNotes();
    else showError(responseJson.message);
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
};

document.body.addEventListener('newNoteAdded', (event) => {
  addNote(event.detail);
});

document.body.addEventListener('deleteNote', (event) => {
  deleteNote(event.detail.noteId);
});

document.body.addEventListener('archiveNote', (event) => {
  const { noteId, isArchived } = event.detail;

  if (isArchived) {
    unarchiveNote(noteId);
  } else {
    archiveNote(noteId);
  }
});

loadNotes();
