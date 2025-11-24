const clock = document.querySelector('.clock')
const pauseBtn = document.querySelector('.pause')
const btn = document.querySelector('.btn')

const list = document.querySelector('.list')

const shortBreak = document.querySelector('.short-break')
const longBreak = document.querySelector('.long-break')
const pomodoro = document.querySelector('.pomodoro')

let time

function cssVariableValues() {
    const ROOTSTYLES = window.getComputedStyle(document.body)

    return {

        getColorTheme: function () { return ROOTSTYLES.getPropertyValue('--COLOR_THEME') },
        getFontTheme: function () {  return ROOTSTYLES.getPropertyValue('--FONT_THEME') }

        

    }
}


function timerDetails() {

    
    return {
        pomodoroTime:  1500, // 25 minutes 25:00
        shortBreak:  300, // 5 minutes 05:00
        longBreak:  900,  // 10 minutes 10:00

    }
}


// function modalDetails() {
    
// }


function startTimer(display) {
    let duration = timerDetails().pomodoroTime
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
            console.log('end of time')
        
            clearInterval(timerOutID)
          
        }

        
    }
   

    

    const pause = () => {
        
        clearInterval(timerOutID)   
        timerOutID = null

        //time remaining right after pause 
        duration = diff
       
        console.log('pause:', duration)
        
    }
      

    const unPause = () => {
        console.log('unpuase',duration)
       
        start = Date.now()
        
        timerOutID = setInterval(timer,1000)
    }

    const reset = () => {

        // reset timer back to appropriate set time
       timer()
        // timerOutID = setInterval(timer, 1000)
        
    }


   
    let timerOutID = setInterval(timer,1000)
 


    return{timer,pause,unPause,reset}
   
}

// Event listeners: pause, pomodoro, short break, long break

pauseBtn.addEventListener('click', (e) => {

    if (!time) {
        time = startTimer(clock)
    }
    
    if (pauseBtn.getAttribute('data-state') === 'noState') {
        pauseBtn.setAttribute('data-state', 'play')
        time.timer()
        pauseBtn.textContent = 'Pause'
    } else if (pauseBtn.getAttribute('data-state') === 'play') {
        pauseBtn.setAttribute('data-state', 'pause')
        console.log('puase')
        time.pause()
        pauseBtn.textContent = 'Play'
     } else if (pauseBtn.getAttribute('data-state') === 'pause') {
        pauseBtn.setAttribute('data-state', 'play')
        console.log('play')
        time.unPause()
        pauseBtn.textContent = 'Pause'
    }
    
})

shortBreak.addEventListener('click', (e) => {

    resetActiveState()
    shortBreak.setAttribute('data-active', 'true')

    // if(timerDetails().shortBreak<=)
    clock.textContent = `0${timerDetails().shortBreak / 60}:00`
        
    
    
})

longBreak.addEventListener('click', (e) => {

    resetActiveState()
    longBreak.setAttribute('data-active', 'true')

    clock.textContent = `${timerDetails().longBreak / 60}:00`

    console.log('long break')
});

pomodoro.addEventListener('click', (e) => {

    resetActiveState()
    pomodoro.setAttribute('data-active', 'true')

    clock.textContent = `${timerDetails().pomodoroTime / 60}:00`
})

btn.addEventListener('click', (e) => {
    test()
})

function test() { 
    // if (!time) {
    //     time = startTimer(clock)
    // }

    // time.timer()
   
    if (!time) {
        time = startTimer(clock)
    }

    time.reset()
  
}

//iterator through list and set data-active to false
function resetActiveState() {

    for (let child of list.children) {

        if (child.hasAttribute("data-active")) {
            child.getAttribute("data-active") === "true" ? child.setAttribute("data-active","false")  :  undefined
        }

        //to be continued
        if (!child.hasAttribute("data-active")) {
            
        }
      
    }
   
}

