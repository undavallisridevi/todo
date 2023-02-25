
// Get the form and task list elements
// const form = document.querySelector('form');


// const taskList = document.getElementById('task-list');






const endpoint = "http://localhost:3020/"
function displayoptions() {
  document.getElementById('assignee').style.display = "block";
}

$(function () {
  opts = $('#assignee option').map(function () {
    return [
      [this.value, $(this).text()]
    ];
  });


  $('#someinput').keyup(function () {

    var rxp = new RegExp($('#someinput').val(), 'i');
    var optlist = $('#assignee').empty();
    opts.each(function () {
      if (rxp.test(this[1])) {
        optlist.append($('<option/>').attr('value', this[0]).text(this[1]));
      } else {
        optlist.append($('<option/>').attr('value', this[0]).text(this[1]).addClass("hidden"));
      }
    });
    $(".hidden").toggleOption(false);

  });
  $('.select-user').click(function () {
    $('.select-user option:selected').remove().appendTo('.chosen-users');
    opts = $('#assignee option').map(function () {
      return [
        [this.value, $(this).text()]
      ];
    });
  });

  $('.chosen-users').click(function () {
    $('.chosen-users option:selected').remove().appendTo('.select-user');
    opts = $('#assignee option').map(function () {
      return [
        [this.value, $(this).text()]
      ];
    });
  });


});

$.fn.toggleOption = function (show) {
  $(this).toggle(show);
  if (show) {
    if ($(this).parent('span.toggleOption').length)
      $(this).unwrap();
  } else {
    if ($(this).parent('span.toggleOption').length == 0)
      $(this).wrap('<span class="toggleOption" style="display: none;" />');
  }
};



document.getElementById("addtask").addEventListener("click", async () => {


  var el = document.getElementById('optlist1');
  let task = document.querySelector("#task").value
  console.log(task);
  var result = [];
  // document.write(result);


  for (var i = 0, iLen = el.options.length; i < iLen; i++) {
    result.push(el.options[i].text);


  }
  console.log(result);


  var today = new Date();
  var todaytime = today.getHours() + ":" + today.getMinutes();

  var finaldata = [];
  let tempData = {};

  result.forEach(ele => {
    tempData["task"] = task;
    tempData["assigned"] = "true";
    tempData["id"] = "no_status";
    tempData["color"] = "#ff6666";
    tempData["time"] = todaytime;
    tempData["username"] = ele
    finaldata.push({...tempData});
  })
 


  await fetch(endpoint + "postdata", {
    method: "POST",


    body: JSON.stringify({
      data: finaldata
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then(response => {
    window.location.reload();
  })
});

var changetextinbutton = document.getElementById('clickme');
changetextinbutton.addEventListener('click', myfunction);

function myfunction() {
  var tablewrap = document.getElementById('displaytable2');
  if (tablewrap.classList.contains('hidden')) {
    tablewrap.classList.remove('hidden')
    changetextinbutton.value = "Hide";




  }
  else {
    tablewrap.classList.add('hidden')
    changetextinbutton.value = "Show";
    tablewrap.style.border = "none";
  }


};






(() => {
  fetch("http://localhost:3020/alltasks")
    .then(res => res.json())
    .then(data => {
      let head = document.getElementById("ttablehead");
      let body = document.getElementById("tbody");
      head.innerHTML = ""
      body.innerHTML = ""
      for (ele in data["tasks"][0]) {
        if ((ele != "assigned") && (ele != "color")) {
          let th = document.createElement("th")
          th.innerHTML = ele
          head.append(th)
        }
      }
      data["tasks"].forEach(obj => {
        let tr = document.createElement("tr")
        for (ele in data["tasks"][0]) {
          if ((ele != "assigned") && (ele != "color"))
            tr.innerHTML += `<td>${obj[ele]}</td>`

        }
        body.appendChild(tr);


      })
    })
}
)();