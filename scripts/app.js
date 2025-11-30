const ROOTSTYLES = window.getComputedStyle(document.body)

const clock = document.querySelector('.clock')
const pauseBtn = document.querySelector('.pause')
const btn = document.querySelector('.btn')
const circularProgress = document.querySelector('.circularProgress')
const strokeArrayStat = Number(circularProgress.getAttribute('stroke-dasharray'))
const settings = document.querySelector('.setting-icon')
const list = document.querySelector('.list').children
const settingsDialog = document.querySelector('.settings-dialog')
const closeIcon = document.querySelector('.close-icon')
const dialogBtn = document.querySelector('.dialog-btn')
const dialogForm = document.querySelector('.dialog-form')
const shortBreak = document.querySelector('.short-break')
const longBreak = document.querySelector('.long-break')
const pomodoro = document.querySelector('.pomodoro')


const timerEndedAlarm = new Audio('./audio/timer.wav')
 
let time = null

//Main TimerDetails Instance
let timerConfig = timerDetails()

function timerDetails() {
    const modes = ["Pomodoro", "Long Break", "Short Break"]

    const colorOptions =  [
            ROOTSTYLES.getPropertyValue('--red400').trim(),
            ROOTSTYLES.getPropertyValue('--cyan300').trim(),
        ROOTSTYLES.getPropertyValue('--purple400').trim(),
    ]
    const fontOptions = [

        ROOTSTYLES.getPropertyValue('--kumbh-sans').trim(),
        ROOTSTYLES.getPropertyValue('--space-mono').trim(),
        ROOTSTYLES.getPropertyValue('--roboto-slab').trim()
    ]
    
    return {
        currentMode: modes[0],
        currentColorTheme: colorOptions[0],
        currentFontTheme: fontOptions[0],
        selfTimer: false,
        pomodoroTime:  25, // 25 minutes 25:00
        shortBreak:  10, // 5 minutes 05:00
        longBreak: 15,  // 10 minutes 10:00
        modes,
        colorOptions,
        fontOptions,

    }
}

function startTimer(display,dur) {
    let duration = (Number(dur) * 60)
    console.log(duration)
    let start = Date.now(), diff, minutes, seconds
    let newStat = -Math.round((strokeArrayStat / duration) * 1000) / 1000
 
      
   
    const timer = () => {
        
        newStat += Math.round((strokeArrayStat / duration) * 1000) / 1000
        circularProgress.setAttribute('stroke-dashoffset', `${newStat}`)
        console.log(newStat)
      
        diff = duration - Math.trunc((Date.now() - start) / 1000)
        
        //truncates the float

        minutes = Math.trunc((diff / 60))
        seconds = Math.trunc((diff % 60))

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        
        if (diff < 1) {
            
        
            clearInterval(timerOutID)
            soundAlarm()
            return
          
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


    if (shortBreak.getAttribute('data-active') === 'true') {
        return
    } else {
           if (time !== null) {
            time.pause()
            time = null
        }


        resetActiveState()
        shortBreak.setAttribute('data-active', 'true')
        circularProgress.setAttribute('stroke-dashoffset', "0")

        clock.textContent = `${timeConversions(timerConfig.shortBreak)}`
    }
   
        
    
    
})

longBreak.addEventListener('click', (e) => {
    pauseBtn.setAttribute('data-state', 'noState')

    if (longBreak.getAttribute('data-active') === 'true') {
        return
    } else {

        if (time !== null) {
            time.pause()
            time = null
        }


        resetActiveState()
        longBreak.setAttribute('data-active', 'true')
        circularProgress.setAttribute('stroke-dashoffset', "0")

        clock.textContent = `${timeConversions(timerConfig.longBreak)}`

    }
   
});

pomodoro.addEventListener('click', (e) => {
    pauseBtn.setAttribute('data-state', 'noState')
    
    
    if (pomodoro.getAttribute('data-active') === 'true') {
        return
    } else {

        if (time !== null) {
          time.pause()
        time = null
        } 
        
        resetActiveState()
        circularProgress.setAttribute('stroke-dashoffset', "0")
        clock.textContent = `${timeConversions(timerConfig.pomodoroTime)}`
         pomodoro.setAttribute('data-active', 'true')
    }

     


    
   

    
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
    const store = []
    const results = formData.reduce( (obj,item) => ({...obj, [item.key]: item.value}), {})
    
    timerConfig = { ...timerConfig, ...results }
    
    //change css variables

    console.log(timerConfig)
    console.log(timerConfig.currentFontTheme)
    document.documentElement.style.setProperty("--COLOR_THEME", `var(${timerConfig.currentColorTheme})`)
    document.documentElement.style.setProperty("--FONT_THEME", `var(${timerConfig.currentFontTheme})`)
    
   
}


//iterator through list and set data-active to false
function resetActiveState() {

    for (let child of list) {

        if (child.hasAttribute("data-active")) {
            child.getAttribute("data-active") === "true" ? child.setAttribute("data-active","false")  :  undefined
        }
       
    }
}

//Called for any timer

function soundAlarm() {
    timerEndedAlarm.currentTime = 0
    timerEndedAlarm.play()
}

function timeConversions(timeInput) {
    const selectedTime = Number(timeInput)

    if (selectedTime >= 10 && selectedTime <= 59) {
       return `${selectedTime}:00`
    }

    if (selectedTime < 10 && selectedTime >= 1) {
        return `0${selectedTime}:00`
    }
    
}

