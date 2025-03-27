const container=document.querySelector(".container"),chatsContainer=document.querySelector(".chats-container"),promptForm=document.querySelector(".prompt-form"),promptInput=promptForm.querySelector(".prompt-input"),fileInput=promptForm.querySelector("#file-input"),fileUploadWrapper=promptForm.querySelector(".file-upload-wrapper"),themeToggleBtn=document.querySelector("#theme-toggle-btn"),API_KEY="AIzaSyAdH-E33JO4my3wIL_nZVmF2N1LYDnXeUs",API_URL=`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;let controller,typingInterval;const chatHistory=[],userData={message:"",file:{}},isLightTheme="light_mode"===localStorage.getItem("themeColor");document.body.classList.toggle("light-theme",isLightTheme),themeToggleBtn.textContent=isLightTheme?"dark_mode":"light_mode";const createMessageElement=(e,...t)=>{const a=document.createElement("div");return a.classList.add("message",...t),a.innerHTML=e,a},scrollToBottom=()=>container.scrollTo({top:container.scrollHeight,behavior:"smooth"}),typingEffect=(e,t,a)=>{t.textContent="";const o=e.split(" ");let s=0;typingInterval=setInterval((()=>{s<o.length?(t.textContent+=(0===s?"":" ")+o[s++],scrollToBottom()):(clearInterval(typingInterval),a.classList.remove("loading"),document.body.classList.remove("bot-responding"))}),1)},generateResponse=async e=>{const t=e.querySelector(".message-text");controller=new AbortController,chatHistory.push({role:"user",parts:[{text:userData.message},...userData.file.data?[{inline_data:(({fileName:e,isImage:t,...a})=>a)(userData.file)}]:[]]});try{const a=await fetch(API_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:chatHistory}),signal:controller.signal}),o=await a.json();if(!a.ok)throw new Error(o.error.message);const s=o.candidates[0].content.parts[0].text.replace(/\*\*([^*]+)\*\*/g,"$1").trim();typingEffect(s,t,e),chatHistory.push({role:"model",parts:[{text:s}]})}catch(a){t.textContent="AbortError"===a.name?"Đã dừng suy nghĩ.":a.message,t.style.color="#d62939",e.classList.remove("loading"),document.body.classList.remove("bot-responding"),scrollToBottom()}finally{userData.file={}}},handleFormSubmit=e=>{e.preventDefault();const t=promptInput.value.trim();if(!t||document.body.classList.contains("bot-responding"))return;userData.message=t,promptInput.value="",document.body.classList.add("chats-active","bot-responding"),fileUploadWrapper.classList.remove("file-attached","img-attached","active");const a=`\n    <p class="message-text"></p>\n    ${userData.file.data?userData.file.isImage?`<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="img-attachment" />`:`<p class="file-attachment"><span class="material-symbols-rounded">description</span>${userData.file.fileName}</p>`:""}\n  `,o=createMessageElement(a,"user-message");o.querySelector(".message-text").textContent=userData.message,chatsContainer.appendChild(o),scrollToBottom(),setTimeout((()=>{const e=createMessageElement('<img class="avatar" src="https://cdn.jsdelivr.net/gh/ducanhdang34/storage@main/images/khoa.jpg" /> <p class="message-text">Tôi đang suy nghĩ...</p>',"bot-message","loading");chatsContainer.appendChild(e),scrollToBottom(),generateResponse(e)}),600)};fileInput.addEventListener("change",(()=>{const e=fileInput.files[0];if(!e)return;const t=e.type.startsWith("image/"),a=new FileReader;a.readAsDataURL(e),a.onload=a=>{fileInput.value="";const o=a.target.result.split(",")[1];fileUploadWrapper.querySelector(".file-preview").src=a.target.result,fileUploadWrapper.classList.add("active",t?"img-attached":"file-attached"),userData.file={fileName:e.name,data:o,mime_type:e.type,isImage:t}}})),document.querySelector("#cancel-file-btn").addEventListener("click",(()=>{userData.file={},fileUploadWrapper.classList.remove("file-attached","img-attached","active")})),document.querySelector("#stop-response-btn").addEventListener("click",(()=>{controller?.abort(),userData.file={},clearInterval(typingInterval),chatsContainer.querySelector(".bot-message.loading").classList.remove("loading"),document.body.classList.remove("bot-responding")})),themeToggleBtn.addEventListener("click",(()=>{const e=document.body.classList.toggle("light-theme");localStorage.setItem("themeColor",e?"light_mode":"dark_mode"),themeToggleBtn.textContent=e?"dark_mode":"light_mode"})),document.querySelector("#delete-chats-btn").addEventListener("click",(()=>{chatHistory.length=0,chatsContainer.innerHTML="",document.body.classList.remove("chats-active","bot-responding")})),document.querySelectorAll(".suggestions-item").forEach((e=>{e.addEventListener("click",(()=>{promptInput.value=e.querySelector(".text").textContent,promptForm.dispatchEvent(new Event("submit"))}))})),document.addEventListener("click",(({target:e})=>{const t=document.querySelector(".prompt-wrapper"),a=e.classList.contains("prompt-input")||t.classList.contains("hide-controls")&&("add-file-btn"===e.id||"stop-response-btn"===e.id);t.classList.toggle("hide-controls",a)})),promptForm.addEventListener("submit",handleFormSubmit),promptForm.querySelector("#add-file-btn").addEventListener("click",(()=>fileInput.click()));
