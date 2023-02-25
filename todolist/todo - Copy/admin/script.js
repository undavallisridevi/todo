

const endpoint="http://localhost:3020/"



document.getElementById("submit").addEventListener("click", async () => {

    let formData = new FormData(document.querySelector("form"));
    let tempData = {};
   
    formData.forEach((value, lable) => {
      // console.log(value + lable);
      tempData[lable] = value;
  console.log(tempData);
    });
  
    await fetch(endpoint + "admindata", {
      method: "POST",
  
  
      body: JSON.stringify({
        data: tempData
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(response=>{
        if(response.redirected){
            window.location.href="http://localhost:3020/assigntasks";
        }
        else{
            return response.text();
        }
    }).then(data=>
        {
        if(data)
        {
            alert(data);
        }
    
  
  })
});
