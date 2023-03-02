import React, { useEffect, useState } from 'react'
// import './chatBot.css';
// import Greeting from './Greeting';
// import QA from './Data/QA.json';


export default function ChatBot() {
    const [userScript, setUserScript] = useState([]);
    const [roboScript, setRoboScript] = useState([]);
    const [inputText, setInputText] = useState();
    const [time, setTime] = useState(0);

    let date=new Date();
    date=date.getHours();
    


    useEffect(()=>{
        let blank=" ";
        chatBotVoice(blank);
        setTime(date);
    },[])

    let mic = document.getElementById('mic');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.onresult = function (e) {
        let resultIndex = e.resultIndex;
        let transcript = e.results[resultIndex][0].transcript;
        let transcriptObj={mess:transcript};
        setUserScript([...userScript,transcriptObj]);
        chatBotVoice(transcript);
        // console.log("=> "+JSON.stringify(userScript));
       
        // console.log("event=> "+JSON.stringify(userScript));
    }

    recognition.onend=function(){
        mic.style.color="black";
    }

    const recordEvent = () => {
        recognition.start();
        mic.style.color="green";
        console.log("Voice Assistance Activate....");
    }

   


    //    robot

    function chatBotVoice(message) {
        const speech = new SpeechSynthesisUtterance();
        //  speech.text = "ya sure my im chitti...";
        if(message.includes("what's your name"))
        speech.text = "Im chitthi....";
         
        else if(message.includes("how are you"))
        speech.text = "im fine n you ?";

        else if(message.includes("papa kahan gaye"))
        speech.text = "Bau khawa gya hai thara paapa";

        else if(message.includes("what's your favourite food"))
        speech.text = "My most favourable food is Dal Bati";

        else if(message.includes("do you know me"))
        speech.text = "yes i know you are human being...";

        else if(message.includes("what's your age"))
        speech.text = "im around 12 to 15 hours old ";

        // else if(message.includes(" "))
        // {time>=1 && time<=12 ? speech.text="Hello, Good Morning...":time>12 && time<=17 ? speech.text="Hello, Good Afternoon...":speech.text="Hello, Good Evening..."}
        

        speech.lang='hi-IN';
        window.speechSynthesis.speak(speech);
        let speechObj={mess:speech.text};
        setRoboScript([...roboScript,speechObj]);
        // setUserScript([...userScript,transcriptObj]);
    }


    return <>
    {/* <Greeting/> */}
        <div className="page-content page-container" id="page-content">
            <div className="padding">
                <div className="row container d-flex justify-content-center">
                    <div className="col-md-6">
                        <div className="card card-bordered">
                            <div className="card-header">
                                <h4 className="card-title"><strong>Chat</strong></h4>
                                <a className="btn btn-xs btn-secondary" href="#" data-abc="true">Let's Chat App</a>
                            </div>


                            <div className="ps-container ps-theme-default ps-active-y" id="chat-content" style={{ overflowY: 'scroll !important', height: "400px !important" }}>


                                {/* {Object.keys(userScript).map((obj,index)=>{
                     return <div className="media media-chat" key={index}>
                      <img className="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..."/>
                      <div className="media-body">
                              <p>{obj}</p>
                        <p className="meta"><time dateTime="2018">00:10</time></p>
                      </div>
                    </div>
                        })} */}


                      <div className="media media-chat">
                      <img className="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..."/>
                      <div className="media-body">
                          {userScript.map((obj,index)=>{
                            //   return
                             <>
                             <p key={index}>{obj.mess}</p><br/>
                             </>
                        
                    })}
                    <p className="meta"><time dateTime="2018">00:10</time></p>
                    </div>
                    </div>

                                {/* <div className="media media-chat">
                                    <img className="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..." />
                                    <div className="media-body">
                                        <p>{userScript}</p>
                                        <p className="meta"><time dateTime="2018">00:10</time></p>
                                    </div>
                                </div> */}

                                <div className="media media-chat media-chat-reverse">
                                    <div className="media-body">
                                        {roboScript.map((obj,index)=>{
                                         return <p key={index}>{obj.mess}</p>
                                         
                                        })}
                                        <p className="meta"><time dateTime="2018">00:10</time></p>
                                    </div>
                                </div>




                                <div className="ps-scrollbar-x-rail" style={{ left: "0px", bottom: '0px' }}><div className="ps-scrollbar-x" tabIndex="0" style={{ left: '0px', width: '0px' }}></div></div><div className="ps-scrollbar-y-rail" style={{ top: '0px', height: '0px', right: '2px' }}><div className="ps-scrollbar-y" tabIndex="0" style={{ top: '0px', height: '2px' }}></div></div></div>

                            <div className="publisher bt-1 border-light">
                                <img className="avatar avatar-xs" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..." />
                                <input className="publisher-input" type="text" placeholder="Write something"  onChange={(e)=>{setInputText(e.target.value)}} />
                                <button className='btn btn-light' id='mic' onClick={recordEvent}> <i className="fa fa-microphone" ></i></button>

                                <span className="publisher-btn file-group">
                                    <i className="fa fa-paperclip file-browser"></i>
                                    <input type="file" />
                                </span>
                                <a className="publisher-btn" href="#" data-abc="true"><i className="fa fa-smile"></i></a>
                                <a className="publisher-btn text-info" href="#" data-abc="true" onClick={()=>{ let inputTextObj={mess:inputText};   setUserScript([...userScript,inputTextObj]); chatBotVoice(inputText)}}><i className="fa fa-paper-plane"></i></a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    </>

}
