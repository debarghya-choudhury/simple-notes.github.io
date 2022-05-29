// add notes

var notepad = document.querySelector(".notepad");
var textarea = document.querySelector("#note")
var note_submit_btn = document.querySelector(".note-submit-btn")
var notes_grid = document.querySelector(".notes-grid")
var nothing_msg = document.querySelector(".nothing-msg")
var num = 1;
var sol = document.querySelector(".sol")

note_submit_btn.addEventListener("click", e => {
    e.preventDefault();

    if (textarea.value === "" || textarea.value === "undefined") {
        textarea.value = "";
        alert("Too lazy to type a note?");
    } else {
        nothing_msg.remove();
        var newNoteValue = textarea.value
        textarea.value = "";
        var newNoteDiv = document.createElement("div");
        newNoteDiv.classList.add("flex", "flex-col", "justify-start", "bg-indigo-900", "p-[3px]", "rounded-t-2xl", "pb-[2px]", "w-fit");
        newNoteDiv.innerHTML = `<div class="p-2 mx-auto font-serif font-semibold tracking-wider text-white text-xl">Note ${num}</div>
        <div class="generated-note bg-white p-2 outline-0 w-40 h-[13vh] max-h-[13vh] break-words overflow-auto text-2xl font-extrabold text-center font-serif">${newNoteValue}</div>
        <div class="flex justify-between">
            <button type="submit"
                class="border-indigo-900 border-3 font-medium shadow-lg bg-orange-300  px-2 py-1 mt-1 w-38 tracking-widest edit">Edit</button>
            <button type="submit"
                class="border-indigo-900 border-3 font-medium shadow-lg bg-orange-300  px-2 py-1 mt-1 w-38 tracking-widest delete">Delete</button>
        </div>`;
        notes_grid.append(newNoteDiv);
        num++;
    }
})

note.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (e.keyCode === 13) { // Enter as input
        note_submit_btn.click();
    }
})

// delete

var generated_notes_div = document.querySelector(".generated-notes-div");

sol.addEventListener("click", e => {
    e.preventDefault();
    if (e.target.classList.contains("delete")) {
        e.target.parentNode.parentNode.remove()
        // num -= 1
    }
})

// edit save notes

sol.addEventListener("click", e => {
    e.preventDefault();
    if (e.target.classList.contains("edit")) {

        e.target.textContent = "Save";
        e.target.classList.remove("edit");
        e.target.classList.add("save");

        var value = e.target.parentNode.previousElementSibling.textContent;

        e.target.parentNode.previousElementSibling.outerHTML = `<textarea class="generated-note bg-white p-2 outline-0 w-40 h-[13vh] max-h-[13vh] overflow-auto break-words text-2xl font-extrabold text-center font-serif">${value}</textarea>`
        e.target.parentNode.previousElementSibling.focus();
        e.target.parentNode.previousElementSibling.setSelectionRange(e.target.parentNode.previousElementSibling.textContent.length, e.target.parentNode.previousElementSibling.textContent.length) // Cool shiz

    } else if (e.target.classList.contains("save")) {

        e.target.textContent = "Edit";
        e.target.classList.remove("save");
        e.target.classList.add("edit");

        var val = e.target.parentNode.previousElementSibling.value
        e.target.parentNode.previousElementSibling.outerHTML = `<div class="generated-note bg-white p-2 outline-0 w-40 h-[13vh] max-h-[13vh] break-words overflow-auto text-2xl font-extrabold text-center font-serif">${val}</div>`

    }
})

// Search Notes

var search_notes = document.querySelector(".search_input");
var search_button = document.querySelector(".search_button");
var hide = document.querySelector(".hide")
var results = document.querySelector(".results")
var notez = document.querySelector(".notez")


search_notes.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (e.keyCode === 13) { // Enter as input
        search_button.click();
    }
})

search_button.addEventListener("click", (e) => {
    e.preventDefault();
    var generated_notes = document.querySelectorAll(".generated-note");
    if (notes_grid.textContent === "" || search_notes.value === "" || search_notes.value === "undefined") {
        alert("Nothing Found");
        search_notes.value = "";
    } else if (hide.classList.contains("hidden")) {
        for (var i = 0; i < generated_notes.length; i++) {
            if (generated_notes[i].textContent.trim().toLowerCase().includes(search_notes.value.toLowerCase())) {
                var n = generated_notes[i].parentNode.cloneNode(true)
                results.innerHTML += ""
                results.append(n);
                n.childNodes[0].nextElementSibling.classList.remove("generated-note")
                hide.classList.remove("hidden")
                notez.classList.add("hidden")
                n.children[2].children[0].remove();
                n.children[2].children[0].remove();
                search_notes.value = "";
            }
        }
    } else {
        alert("Nothing else there");
        search_notes.value = "";
    }
})



// reset

var reset = document.querySelector(".reset")

reset.addEventListener("click", () => {
    results.innerHTML = "";
    hide.classList.add("hidden");
    notez.classList.remove("hidden");
})
