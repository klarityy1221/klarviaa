(async ()=>{
  try{
    const fetch = (await import('node-fetch')).default;
    const res = await fetch('http://localhost:4000/api/profile',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:1,name:'Smoke Test User 3',email:'smoketest3@example.com',phone:'555-0003',emergencyContact:'spouse:555-0004',preferences:{notifications:true}})});
    console.log('status',res.status);
    console.log(await res.json());
  }catch(e){console.error(e)}
})();
