console.log("This is the new project");
showNotes();

let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click', function (e) {
    let addtext = document.getElementById('addtext');
    let addtitle = document.getElementById('addtitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let myobj = {
        title: addtitle.value,
        text: addtext.value
    }
    notesobj.push(myobj);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    addtext.value = " ";
    addtitle.value = ' ';

    showNotes();
    // console.log(notes);

});

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];

    }
    else {
        notesobj = JSON.parse(notes);
    }
    let html = "";
    notesobj.forEach(function (element, index) {
        html += `
        <div class="Notescard my-3 mx-3" style="width: 18rem;">
          <div class="card-body">
            <h5 class='card-title'> ${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onclick="deletenote(this.id)" class="btn btn-success">Delete Notes</button>
         </div>
        </div>`   ;
    });
    let notesEln = document.getElementById('notes');
    if (notesobj.length != 0) {
        notesEln.innerHTML = html;
    }
    else {
        notesEln.innerHTML = `Nothing to show! use 'Add' section above to add notes`;
    }
}

function deletenote(index) {
    // console.log('I am deleting',index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    showNotes();
}

let Search = document.getElementById("searchtxt");
Search.addEventListener("text", function (e) {
    let inputVal = Search.value;
    // console.log('Input event field!',inputVal);
    let notecards = document.getElementsByClassName('Notescard');
    Array.from(notecards).forEach(function (element) {
        let cardtxt = element.getElementsByTagName('p')[0].innerText;
        // console.log(cardtxt);
        if (cardtxt.includes(inputVal)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    });
});

