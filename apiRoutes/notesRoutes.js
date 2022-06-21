app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    let noteList = JSON.parse(fs.writeFileSync("./db/db.json", "utf8"));
    let notelength = (noteList.length).toString();
    newNote.id = notelength;
    noteList.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
});

app.delete("/api/notes", (req, res) => {
    let noteList = JSON.parse(fs.writeFileSync("./db/db.json", "utf8"));
    let noteId = (req.params.id).toString();
    noteList = noteList.filter(selected => {
        return selected.id != noteId
    });
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
});

app.listen(PORT, () => console.log("Server listening on port " + PORT));