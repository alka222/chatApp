
document.getElementById('chat-form').onsubmit = async function(e){
    e.preventDefault();

    const message = {
        message: e.target.message.value
    }

    console.log(message);

    try{

        const token = localStorage.getItem('userToken');
        const response = await axios.post(`http://localhost:3000/user/postMessage`, message, {headers: {"Authorization": token}})
        
         console.log(response.data.arr);

        e.target.message.value= "";
    }

    catch(err){
        console.log(err);
    }
}