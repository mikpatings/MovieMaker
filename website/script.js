let currentMode = 'standby';
let isBooted = false;


setTimeout(() => {
    document.getElementById('bootSequence').style.display = 'none';
    isBooted = true;
    initializeDataStream();
}, 3000);


function initializeDataStream() {
    const dataContainer = document.getElementById('dataReadout');
    const systemData = [
        'SYS_CORE_TEMP: 2847°F',
        'POWER_OUTPUT: 8.2GJ/s',
        'ALTITUDE: 3247 FT',
        'VELOCITY: 0 MPH',
        'HEADING: 042°',
        'TARGET_LOCK: STANDBY',
        'INTEGRITY: 100%',
        'REPULSORS: ARMED',
        'UNIBEAM: STANDBY',
        'GPS_STATUS: LOCKED',
        'COMMS: ENCRYPTED',
        'JARVIS: ONLINE'
    ];

    setInterval(() => {
        if (!isBooted) return;
        
        const line = document.createElement('div');
        line.className = 'data-line';
        line.textContent = systemData[Math.floor(Math.random() * systemData.length)];
        
        dataContainer.appendChild(line);
        
        if (dataContainer.children.length > 15) {
            dataContainer.removeChild(dataContainer.firstChild);
        }
    }, 800);
}


function togglePanel(panel) {
    if (!isBooted) return;
    
    panel.style.background = 'rgba(74, 158, 255, 0.2)';
    panel.style.boxShadow = '0 0 20px rgba(74, 158, 255, 0.5)';
    
    generateBeep(800, 0.1);
    
    setTimeout(() => {
        panel.style.background = 'rgba(0, 0, 0, 0.7)';
        panel.style.boxShadow = 'none';
    }, 300);
}

function setMode(mode) {
    if (!isBooted) return;
    
    currentMode = mode;
    
    document.querySelectorAll('.nav-button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(74, 158, 255, 0.1);
        pointer-events: none;
        z-index: 1000;
        animation: modeFlash 0.5s ease-out forwards;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes modeFlash {
            0% { opacity: 0.1; }
            50% { opacity: 0.05; }
            100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(flash);
    generateBeep(600, 0.2);
    
    setTimeout(() => {
        if (flash.parentNode) {
            flash.parentNode.removeChild(flash);
        }
    }, 500);
}

function generateBeep(frequency, duration) {
    if (!window.audioContext) {
        try {
            window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            return;
        }
    }
    
    const oscillator = window.audioContext.createOscillator();
    const gainNode = window.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(window.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, window.audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.05, window.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, window.audioContext.currentTime + duration);
    
    oscillator.start(window.audioContext.currentTime);
    oscillator.stop(window.audioContext.currentTime + duration);
}

document.addEventListener('keydown', (e) => {
    if (!isBooted) return;
    
    switch(e.key) {
        case '1':
            setMode('standby');
            break;
        case '2':
            setMode('flight');
            break;
        case '3':
            setMode('combat');
            break;
        case ' ':
            e.preventDefault();
            lockTarget();
            break;
    }
});

setTimeout(() => {
    if (isBooted) {
        document.querySelector('.nav-button').classList.add('active');
    }
}, 3500);