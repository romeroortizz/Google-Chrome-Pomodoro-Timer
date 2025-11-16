const clock = document.querySelector('.clock')
let fiveMin = 5


function cssVariableValues() {
    const ROOTSTYLES = window.getComputedStyle(document.body)

    return {

        getColorTheme: function () { return ROOTSTYLES.getPropertyValue('--COLOR_THEME') },
        getFontTheme: function () {  return ROOTSTYLES.getPropertyValue('--FONT_THEME') }

        

    }
}


function timerDetails() {

    
    return {
        pomodoroTime: modalPomodoro ?? 1500,
        shortBreak: modalShortBreak ?? 300,
        longBreak: modalLongBreak ?? 900,

    }
}


// function modalDetails() {
    
// }



function startTimer(duration, display) {
    let start = Date.now(), diff, minutes, seconds
    
    const timer = () => {

         //get number of seconds that have elapsed since startTimer() was called
        diff = duration - Math.trunc((Date.now() - start) / 1000)
        
        //truncates the float

        minutes = Math.trunc((diff / 60))
        seconds = Math.trunc((diff % 60))

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;


        if (diff <= 0) {
            clearInterval(timerOutID)
        }

        
    }
   

    const pause = () => {}

    const unPause = () => {}

  const timerOutID = setInterval(timer,1000)


    return{timer,pause,unPause}
   
}

startTimer(fiveMin,clock)


function test() { 
    console.log()
   
  
}

test()