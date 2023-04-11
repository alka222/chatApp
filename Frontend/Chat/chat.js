let chatArray = []
const chatContainer = document.querySelector('.m-b-0');
const User = localStorage.getItem('name');

const token = localStorage.getItem('userToken');


window.addEventListener('DOMContentLoaded', loadScreen)


async function loadScreen(e){
    e.preventDefault();

    document.getElementById('username').innerHTML = User
    getMessage();

    }


document.getElementById('chat-form').onsubmit = async function(e){
    e.preventDefault();

    const message = {
        message: e.target.message.valu
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

    setInterval(async() => {

        try {
            const token = localStorage.getItem('userToken');
            const response =  await axios.get(`http://localhost:3000/user/getMessage`  , {headers:{"Authorization" : token}})
            console.log(response.data.data.arr)
            var newArr = response.data.data.arr;
            console.log(newArr)
            saveToLocal(newArr);
        }
        
        catch (err) {
            console.log(err);
        }

    }, 1000)


}

function saveToLocal(arr){

        let oldMessages = JSON.parse(localStorage.getItem(`msg`));

        if(oldMessages == undefined || oldMessages.length == 0){
            chatArray = chatArray.concat(arr)
        }
        
        else{
                chatArray =[]
                chatArray = chatArray.concat(oldMessages,arr);
        }

        localStorage.setItem(`msg` , JSON.stringify(chatArray));
        showChatsOnScreen();

}


function showChatsOnScreen(){

    chatContainer.innerHTML = ""

    chatArray.forEach(chat =>{

        if(User == chat.name){
            
            let child = `<li class="clearfix" id=${chat.id}>
            <div class="message-data text-right">
                <span class="message-data-time">${chat.name}</span>
                <span class="message-data-time">${chat.createdAt.split('T')[1].slice(0,5)}</span>
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar">
            </div>
            <div class="message other-message float-right">${chat.message}</div>
        </li>`

          chatContainer.innerHTML += child
        }
        else{
            let child = `<li class="clearfix" id=${chat.id}>
            <div class="message-data">
                <span class="message-data-time">${chat.name}</span>
                <span class="message-data-time">${chat.createdAt.split('T')[1].slice(0,5)}</span>
            </div>
            <div class="message my-message">${chat.message}</div>
        </li>`

          chatContainer.innerHTML += child


        }
    })

}
