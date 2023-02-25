let a
let data;
let b;
const endpoint = "http://localhost:3020/"
console.log("sjfskfhekb")
const api_url = endpoint + "getdata"
const todos = document.querySelectorAll(".todo");
  console.log(todos)
  // const deletetasks = document.querySelectorAll(".cross");
  // deletetasks.forEach((cross) => {
  //   cross.addEventListener("click", deletetask);
  // })



  todos.forEach((todo) => {
    todo.addEventListener("dragstart", dragStart);
    todo.addEventListener("dragend", dragEnd);
    todo.addEventListener("dblclick", edit);
  });




// Defining async function 

// async function getapi(url) {



//   // Storing response 

//   const response = await fetch(url);



//   // Storing data in form of JSON 

//   data = await response.json();







// }

// Defining async function 
let draggableTodo = null;
const all_status = document.querySelectorAll(".status");
(async () => {
  // Storing response 
  const response = await fetch(endpoint + "getupdateddata");
  // Storing data in form of JSON 
  data = await response.json();
  
  console.log(data["tasks"]);
  data["tasks"].forEach(ele => {
    let parent = document.getElementById(ele.id)
    parent.innerHTML += `<div class="todo" style="background:${ele.color};"  draggable="true"><div><span>${ele.task}</span>@ ${ele.time}</div><span class="cross">&#x2716;</span></div>`

  })
  

})();


// Calling that async function 




function dragStart() {

  draggableTodo = this;
console.log(draggableTodo)
  setTimeout(() => {
   
  }, 0);
}

function dragEnd() {
  draggableTodo.style.backgrounColor = "red";
  draggableTodo = null;
  setTimeout(() => {
    
  }, 0);

}

all_status.forEach((status) => {
  status.addEventListener("dragover", dragOver);
  status.addEventListener("dragenter", dragEnter);
  status.addEventListener("dragleave", dragLeave);
  status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
  e.preventDefault();

}

function dragEnter() {
  this.style.border = "1px dashed #ccc";

}

function dragLeave() {
  this.style.border = "none";

}

function dragDrop() {

  this.style.border = "none";

  var color = draggableTodo.style.backgroundColor;
  console.log(draggableTodo.textContent);

  if (this.id === "no_status") {
    color = " #ff6666";
    draggableTodo.style.backgroundColor = "#ff6666";
  }
  if (this.id === "pending") {
    color = "#3399ff";

    draggableTodo.style.backgroundColor = "#3399ff";
  }
  if (this.id === "inprogress") {
    color = "#ffff1a";
    draggableTodo.style.backgroundColor = "#ffff1a";
  }
  if (this.id === "completed") {
    color = "#00e600";
    draggableTodo.style.backgroundColor = "#00e600";
  }

  this.appendChild(draggableTodo);
  a = draggableTodo.childNodes[0].childNodes[0].innerHTML;

  a = a.trim();
  b = this.id;
console.log(a);
  console.log(b);
  for (var i = 0; i < data.tasks.length; i++) {
   
    if (data.tasks[i].task === a)
     {
      
      data.tasks[i].color = color;


      data.tasks[i].id = b;
    }
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'

    },
    body: JSON.stringify(data)
  };
 
  fetch('http://localhost:3020/api', options);

 


}

//delete tasks
function deletetask() {
  const d = document.getElementById('deleted');
  // console.log(this.parentElement);
  var a = this.parentElement.childNodes[0].innerHTML;
  // // this.parentElement.style.backgroundcolor=red;
  // (this.parentElement).style.backgroundColor = "red";
  d.appendChild(this.parentElement);
 
  for (var i = 0; i < data.tasks.length; i++) {
    if (data.tasks[i].task == a) {
      data.tasks[i].id = "deleted";

    }
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'

    },
    body: JSON.stringify(data)
  };
  // console.log(data);
  fetch('http://localhost:3020/api', options);




}


//edit tasks
function edit() {


  var current = $(this).text();


  var currenttext = this.childNodes[0].childNodes[0].innerHTML;
 
  if(typeof(currenttext)!=="undefined"){
   
  currenttext=currenttext.trim();
  }
  $(this).html('<textarea class="form-control" id="newcont" rows="5">'+current+'</textarea>');
  $("#newcont").focus();

  $("#newcont").focus(function () {
    console.log('in');
  }).blur(function () {
    newcont = $("#newcont").val();
    var newtext = (newcont.substring(0, newcont.indexOf("@")));
    newtext=newtext.trim();
    $(".todo").text(newcont);

console.log(newtext);
    for (var i = 0; i < data.tasks.length; i++) {
      if (data.tasks[i].task == currenttext) {
        data.tasks[i].task = newtext;

      }
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'

      },
      body: JSON.stringify(data)
    };
    // console.log(data);
    fetch('http://localhost:3020/api', options);

  });



}






/* time */
var dropdown = document.getElementById("dropdownhr");

for (var i = 1; i <= 12; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  var option = document.createElement("option");
  option.text = i;
  option.value = i;
  dropdown.add(option);
}
var dropdown = document.getElementById("dropdownmin");

for (var i = 0; i <= 59; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  var option = document.createElement("option");
  option.text = i;
  option.value = i;
  dropdown.add(option);
}

function addtotime() {
  if (document.getElementById('24hrs').checked) {

    var value24hrs = document.getElementById('24hrsclock').value;
    document.getElementById('time').value = value24hrs;
  }
  else {
    document.getElementById('time').placeholder = "HH:MM AM/PM";
    var hr = document.getElementById('dropdownhr').value;


    var min = document.getElementById('dropdownmin').value;
    var c = document.getElementById('am');
    var text = c.options[c.selectedIndex].text;
    document.getElementById('time').value = hr + ":" + min  + " " + text;
  }
};
function hours() {
  if (document.getElementById('24hrs').checked) {
    $('#time').attr('placeholder', "HH:MM");
    document.getElementById('24hrclock').style.visibility = 'visible';
    document.getElementById('12hrclock').style.visibility = 'hidden';
  }
  else {
    $('#time').attr('placeholder', "HH:MM AM/PM");
    document.getElementById('12hrclock').style.visibility = 'visible';
    document.getElementById('24hrclock').style.visibility = 'hidden';
  }
}



/* modal */
const btns = document.querySelectorAll("[data-target-modal]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.targetModal).classList.add("active");
    overlay.classList.add("active");
  });
});

close_modals.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    modal.classList.remove("active");
    overlay.classList.remove("active");
  });
});

window.onclick = (event) => {
  if (event.target == overlay) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => modal.classList.remove("active"));
    overlay.classList.remove("active");
  }
};




const close_btns = document.querySelectorAll(".close");


close_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    deleted.append
    btn.parentElement.style.display = "none";
  });
});
document.getElementById("todo_submit").addEventListener("click", async () => {

  let formData = new FormData(document.querySelector("form"));
  let tempData = {};
  tempData["id"] = "no_status";
  tempData["color"] = " #ff6666";
  tempData["assigned"]="no";
  formData.forEach((value, lable) => {
    // console.log(value + lable);
    tempData[lable] = value;

  });
  document.getElementById("todo_input").value = "";
  todo_form.classList.remove("active");
  overlay.classList.remove("active");
  await fetch(endpoint + "postdata", {
    method: "POST",


    body: JSON.stringify({
      data: tempData
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((ele) => { window.location.reload(1) })

});
// getapi(api_url);
function display() {
  var delete_ele = document.getElementById("deleted");
  var delbutton = document.getElementById("show");

  if (delete_ele.classList.contains('del')) {
    //delete_ele.style.display='block!important';
    delbutton.textContent  ="Hide";
    delete_ele.classList.remove('del');
    
  }

  else {
    delete_ele.classList.add('del');
    delbutton.textContent="Show";
    // delete_ele.style.display='none!important';
  }
}

