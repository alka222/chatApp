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

    const messages = JSON.parse(localStorage.getItem(`msg`));
    // console.log(messages[messages.length-1].id);
    if(messages == undefined || messages.length == 0) {
        lastId = 0;
    }
    else {
        lastId = messages[messages.length-1].id;
    }

    // setInterval(async() => {

        try {
            const token = localStorage.getItem('userToken');
            const response =  await axios.get(`http://localhost:3000/user/getMessage/?msg=${lastId}`  , {headers:{"Authorization" : token}})
            console.log(response.data.data)
            var newArr = response.data.data;
            console.log(newArr)
            saveToLocal(newArr);
        }
        
        catch (err) {
            console.log(err);
        }

    // }, 1000)


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
                <span class="message-data-time">${localStorage.getItem('name')}</span>
                <span class="message-data-time">${chat.createdAt.split('T')[1].slice(0,5)}</span>
            </div>
            <div class="message my-message">${chat.message}</div>
        </li>`

          chatContainer.innerHTML += child


        }
    })



function ShowExpenses(user){
    console.log(user)
    let parentNode = chatContainer;
    let childHTML = `<li id=${user.id}> ${user.amount}-${user.descip}-${user.category}
        <button onclick=deleteUser('${user.id}')> Delete </button>
        </li>`;
  
  
    parentNode.innerHTML= parentNode.innerHTML+childHTML;
    }

    document.getElementById(`${lastId}`).scrollIntoView()
    console.log(lastId)

}
