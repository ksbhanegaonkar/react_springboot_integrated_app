export const postRequest =(action,data,onDataReceive) =>{
    console.log("called from rest utils");
    fetch(new Request('/services'+action),
    {
      headers:{
        'Content-Type': 'application/json',
      },
       method: 'POST', // or 'PUT'
       //mode:"no-cors",
       body: JSON.stringify(data) // data can be `string` or {object}!
      
    }
       )

  .then((res)=>res.json())
  .then(data=>{
    onDataReceive(data);
  });
}

export const postRequestEveryInterval =(action,data,onDataReceive,interval) =>{
setInterval(()=>{
  fetch(new Request('/services'+action),
  {
    headers:{
      'Content-Type': 'application/json',
    },
     method: 'POST', // or 'PUT'
     //mode:"no-cors",
     body: JSON.stringify(data) // data can be `string` or {object}!
    
  }
     )

.then((res)=>res.json())
.then(data=>{
  onDataReceive(data);
});
},interval);
}

export const getRequest =(action,onDataReceive) =>{
  console.log("called from rest utils");
  fetch(new Request('/services'+action),
  {
    
     method: 'GET'

  }
     )

.then((res)=>res.json())
.then(data=>{
  onDataReceive(data);
});
}