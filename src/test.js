import { useEffect } from "react";

function Test(){
    console.log('Hi from test');

    useEffect(()=>{
        const webgazer = window.webgazer;
        webgazer.setGazeListener((data,clock) =>{
            webgazer.showVideo(true);
            console.log(data,clock);
        }).begin();
    })
    
    return (
        <div>

        </div>
    )
}
export default Test;