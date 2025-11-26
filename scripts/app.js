const clock = document.querySelector('.clock')
const pauseBtn = document.querySelector('.pause')
const btn = document.querySelector('.btn')
const circularProgress = document.querySelector('.circularProgress')

const settings = document.querySelector('.setting-icon')
const list = document.querySelector('.list').children
const settingsDialog = document.querySelector('.settings-dialog')
const closeIcon = document.querySelector('.close-icon')
const dialogBtn = document.querySelector('.dialog-btn')
const dialogForm = document.querySelector('.dialog-form')
const shortBreak = document.querySelector('.short-break')
const longBreak = document.querySelector('.long-break')
const pomodoro = document.querySelector('.pomodoro')

let time = null

//Main TimerDetails Instance
const timerConfig = timerDetails()

function cssVariableValues() {
    const ROOTSTYLES = window.getComputedStyle(document.body)

    return {

        getColorTheme: function () { return ROOTSTYLES.getPropertyValue('--COLOR_THEME') },
        getFontTheme: function () {  return ROOTSTYLES.getPropertyValue('--FONT_THEME') }

    }
}

function timerDetails() {

    
    return {
        currentMode: "Pomodoro",
        selfTimer: false,
        pomodoroTime:  1500, // 25 minutes 25:00
        shortBreak:  300, // 5 minutes 05:00
        longBreak: 900,  // 10 minutes 10:00
        modes: ["Pomodoro", "Long Break", "Short Break"]

    }
}

function startTimer(display,dur) {
    let duration = dur
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
    console.log(time)
    if (!time) {
        for (let l of list) {
            if (l.getAttribute("data-active") === 'true') {

                switch (l.textContent) {
                    case `${timerConfig.modes[0].toLowerCase()}`:
                        console.log('Pom')
                        time = startTimer(clock, timerConfig.pomodoroTime)
                        break
                    case `${timerConfig.modes[1].toLowerCase()}`:
                        time = startTimer(clock, timerConfig.longBreak)
                        console.log('Long')
                        break
                    case `${timerConfig.modes[2].toLowerCase()}`:
                         time = startTimer(clock, timerConfig.shortBreak)
                        console.log('Short')
                        break
                    default: 
                        console.log("Not matching mode found from object")
                }              
                
            }          
        }     
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
    pauseBtn.setAttribute('data-state', 'noState')
    timerConfig.currentMode = "Short Break"

    
     if (time !== null) {
          time.pause()
        time = null
    } 
  
    resetActiveState()
    shortBreak.setAttribute('data-active', 'true')

    // if(timerDetails().shortBreak<=)
    clock.textContent = `0${timerConfig.shortBreak / 60}:00`
        
    
    
})

longBreak.addEventListener('click', (e) => {
    pauseBtn.setAttribute('data-state', 'noState')
    if (time !== null) {
          time.pause()
        time = null
    } 
   
   
    resetActiveState()
    longBreak.setAttribute('data-active', 'true')

    clock.textContent = `${timerConfig.longBreak / 60}:00`

    console.log('long break')
});

pomodoro.addEventListener('click', (e) => {
    pauseBtn.setAttribute('data-state', 'noState')

     if (time !== null) {
          time.pause()
        time = null
    } 


    resetActiveState()
    pomodoro.setAttribute('data-active', 'true')

    clock.textContent = `${timerConfig.pomodoroTime / 60}:00`
})

btn.addEventListener('click', (e) => {
    circularProgress.setAttribute('stroke-dashoffset','100') 
   console.log(circularProgress.getAttribute('stroke-dashoffset'))
})







settings.addEventListener('click', (e) => {
    console.log(dialogBtn)
    settingsDialog.showModal()
    
})

dialogBtn.addEventListener('click', getFormDetails)

function getFormDetails(e) {
    e.preventDefault()

    const formDetails = []
   
    const userSelectedSettings = new FormData(dialogForm)

    for (const [key, value] of userSelectedSettings) {
        formDetails.push({key: `${key}`, value: `${value}`})
    }


    readFormData(formDetails)
   
    
}


function readFormData(formData) {
    console.log(formData)

   
}






function test() { 
    // if (!time) {
    //     time = startTimer(clock)
    // }

    // time.timer()
   
    // if (!time) {
    //     time = startTimer(clock)
    // }

    // time.reset()
 
    console.log(getFormDetails())
     
}

//iterator through list and set data-active to false
function resetActiveState() {

    for (let child of list) {

        if (child.hasAttribute("data-active")) {
            child.getAttribute("data-active") === "true" ? child.setAttribute("data-active","false")  :  undefined
        }
        //to be continued
        if (!child.hasAttribute("data-active")) {      
        }  
    }
}
