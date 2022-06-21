var $noteTitle = $('.note-title');
var $noteText = $('.note-textarea');
var $saveNoteBtn = $('.save-note');;
var $newNoteBtn = $('.new-note');
var $noteList = $('.list-container .list-group');

var activateNote = {};

var getNotes = function() {
  return $.ajax({
    url: "/api/notes", method: "GET"
  });
};

var saveNote = function(note) {
  return $.ajax({
    url: "/api/notes", data: note, method: "POST"
  });
};

var deleteNote = function(id) {
  return $.ajax({
    url: "/api/notes" + id, method: "DELETE"
  });
};

var renderActiveNote = () => {
  hide(saveNoteBtn);

  if (activeNote.id) {
    $noteTitle.setAttribute('readonly', true);
    $noteText.setAttribute('readonly', true);
    $noteTitle.value(activeNote.title);
    $noteText.value(activeNote.text);
  } else {
    $noteTitle.removeAttribute('readonly', false);
    $noteText.removeAttribute('readonly', false);
    $noteTitle.value = ('');
    $noteText.value = ('');
  }
};

var handleNoteSave = function() {
  var newNote = {
    title: $noteTitle.value(),
    text: $noteText.value(),
  };

  saveNote(newNote).then(function(data) {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
var handleNoteDelete = function(event) {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  var note = $(this)
    .parent('list-group-item')
    .data();

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(function() {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
var handleNoteView = function() {
  activeNote = $(this).data();
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
var handleNewNoteView = function() {
  activeNote = {};
  renderActiveNote();
};

var handleRenderSaveBtn = function() {
  if (!$noteTitle.value().trim() || !$noteText.value().trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// Render the list of note titles
var renderNoteList = function(notes) {
  $noteList.empty();
  var noteListItems = [];
  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];
    var $li = $("<li class = 'list-group-item'>").data(note);
    var $span = $("<span>").text(note.title);
    var $delBtn = $(<i class = 'fas fa-trash-alt float-right text-danger delete-note'></i>);
    $li.append($span, $delBtn);
    noteListItems.push($li);
  }
  $noteList.append(noteListItems);
};
  
var getAndRenderNotes = function() {
  return getNotes().then(function(data) {
    renderNoteList(data);
  });
};

$saveNoteBtn.addEventListener('click', handleNoteSave);
$noteList.addEventListener('click', '.list-group-item', handleNoteView);
$newNoteBtn.addEventListener('click', handleNewNoteView);
$noteList.addEventListener('click', '.delete-note', handleNoteDelete);
$noteTitle.addEventListener('keyup', handleRenderSaveBtn);
$noteText.addEventListener('keyup', handleRenderSaveBtn);

getAndRenderNotes();
