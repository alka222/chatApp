window.addEventListener('DOMContentLoaded', loadScreen)
const token = localStorage.getItem('userToken');

async function loadScreen(e){
    e.preventDefault();

    document.getElementById('username').innerHTML = 'user'
    getMessage();

    }


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


async function getMessage(){

    try {
        const token = localStorage.getItem('userToken');
        const response =  await axios.get(`http://localhost:3000/user/getMessage`  , {headers:{"Authorization" : token}})
        console.log(response.data);
    }
    
    catch (err) {
        console.log(err);
    }
}



