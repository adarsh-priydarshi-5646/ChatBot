// let prompt=document.querySelector("#prompt")
// let submitbtn=document.querySelector("#submit")
// let chatContainer=document.querySelector(".chat-container")
// let imagebtn=document.querySelector("#image")
// let image=document.querySelector("#image img")
// let imageinput=document.querySelector("#image input")

// const Api_Url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyArSF6fG2O1N3cIfUSZN07f-wN0W7KgMUw"

// let user={
//     message:null,
//     file:{
//         mime_type:null,
//         data: null
//     }
// }
 
// async function generateResponse(aiChatBox) {

// let text=aiChatBox.querySelector(".ai-chat-area")
//     let RequestOption={
//         method:"POST",
//         headers:{'Content-Type' : 'application/json'},
//         body:JSON.stringify({
//             "contents":[
//                 {"parts":[{text:user.message},(user.file.data?[{inline_data:user.file}]:[])

//                 ]
//             }]
//         })
//     }
//     try{
//         let response= await fetch(Api_Url,RequestOption)
//         let data=await response.json()
//        let apiResponse=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
//        text.innerHTML=apiResponse    
//     }
//     catch(error){
//         console.log(error);
        
//     }
//     finally{
//         chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})
//         image.src=`img.svg`
//         image.classList.remove("choose")
//         user.file={}
//     }
// }



// function createChatBox(html,classes){
//     let div=document.createElement("div")
//     div.innerHTML=html
//     div.classList.add(classes)
//     return div
// }


// function handlechatResponse(userMessage){
//     user.message=userMessage
//     let html=`<img src="user.png" alt="" id="userImage" width="8%">
// <div class="user-chat-area">
// ${user.message}
// ${user.file.data?`<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" />` : ""}
// </div>`
// prompt.value=""
// let userChatBox=createChatBox(html,"user-chat-box")
// chatContainer.appendChild(userChatBox)

// chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})

// setTimeout(()=>{
// let html=`<img src="ai.png" alt="" id="aiImage" width="10%">
//     <div class="ai-chat-area">
//     <img src="loading.webp" alt="" class="load" width="50px">
//     </div>`
//     let aiChatBox=createChatBox(html,"ai-chat-box")
//     chatContainer.appendChild(aiChatBox)
//     generateResponse(aiChatBox)

// },600)

// }


// chatbox.addEventListener("keydown",(e)=>{
//     if(e.key=="Enter"){
//        handlechatResponse(prompt.value)

//     }
// })

// send-btn.addEventListener("click",()=>{
//     handlechatResponse(prompt.value)
// })
// imageinput.addEventListener("change",()=>{
//     const file=imageinput.files[0]
//     if(!file) return
//     let reader=new FileReader()
//     reader.onload=(e)=>{
//        let base64string=e.target.result.split(",")[1]
//        user.file={
//         mime_type:file.type,
//         data: base64string
//     }
//     image.src=`data:${user.file.mime_type};base64,${user.file.data}`
//     image.classList.add("choose")
//     }
    
//     reader.readAsDataURL(file)
// })


// imagebtn.addEventListener("click",()=>{
//     imagebtn.querySelector("input").click()
// })


let userInput = document.querySelector("#user-input");
let sendBtn = document.querySelector(".send-btn");
let chatBox = document.querySelector("#chat-box");
let typingIndicator = document.querySelector("#typing-indicator");

const Api_Url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=your_api_key";

let user = {
    message: null
};

async function generateResponse(aiChatBox) {
    let text = aiChatBox.querySelector(".ai-chat-area");
    let requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "contents": [{ "parts": [{ "text": user.message }] }]
        })
    };
    try {
        let response = await fetch(Api_Url, requestOptions);
        let data = await response.json();
        let apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        text.innerHTML = apiResponse;
    } catch (error) {
        console.log(error);
        text.innerHTML = "Error fetching response.";
    } finally {
        chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: "smooth" });
        typingIndicator.style.display = "none";
    }
}

function createChatBox(html, classes) {
    let div = document.createElement("div");
    div.innerHTML = html;
    div.classList.add(classes);
    return div;
}

function handleChatResponse(userMessage) {
    if (!userMessage.trim()) return;
    
    user.message = userMessage;
    let userHtml = `<div class="user-chat-box"> <img src="user.png" alt="User" width="8%"> <div class="user-chat-area">${user.message}</div></div>`;
    let userChatBox = createChatBox(userHtml, "user-chat-box");
    chatBox.appendChild(userChatBox);
    chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: "smooth" });
    
    setTimeout(() => {
        let aiHtml = `<div class="ai-chat-box"> <img src="ai-removebg-preview.png" alt="AI" width="10%"> <div class="ai-chat-area"> <img src="loading.webp" alt="Loading" width="50px"></div></div>`;
        let aiChatBox = createChatBox(aiHtml, "ai-chat-box");
        chatBox.appendChild(aiChatBox);
        typingIndicator.style.display = "block";
        generateResponse(aiChatBox);
    }, 600);
    
    userInput.value = "";
}

userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        handleChatResponse(userInput.value);
    }
});

sendBtn.addEventListener("click", () => {
    handleChatResponse(userInput.value);
});