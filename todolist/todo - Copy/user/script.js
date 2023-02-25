

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById("usersubmit").addEventListener("click", async () => {

    let formData = new FormData(document.querySelector("form"));
    let tempData = {};
  
    formData.forEach((value, lable) => {
      // console.log(value + lable);
      tempData[lable] = value;
  
    });
   
  
  

  
    await fetch("http://localhost:3020/userauthenticate", {
      method: "POST",
  
  
      body: JSON.stringify({
        data: tempData
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(response=>
        {
            if(response.redirected)
            window.location.href=response.url;
            else
            return response.text();
        }).then(data=>
            {
                if(data)
                alert(data);
            })
      
    })
  