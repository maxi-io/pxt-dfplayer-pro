/**
* DFPlayer Pro
* Refer to https://wiki.dfrobot.com/DFPlayer_PRO_SKU_DFR0768
*/

//% weight=9 color=#666699 icon="\uf001" block="DFPlayer Pro"
namespace dfplayerpro {

    let isConnected: boolean = false;

    export enum playType {
        //% block="Play"
        Play = 0,
        //% block="Pause"
        Pause = 1,
        //% block="Play Next"
        PlayNext = 2,
        //% block="Play Previous"
        PlayPrevious = 3,
    }

    export enum playBackModeType {
        //% block="Repeat one song"
        Repeat = 1,
        //% block="Repeat all"
        RepeatAll = 2,
        //% block="Play one song & pause"
        PlayOneSongPause = 3,
        //% block="Play Randomly"
        Randomly = 4,
        //% block="Repeat all in folder"
        RepeatAllInFolder = 5,
    }

    export enum switchType {
        //% block="Off"
        Off = 0,
        //% block="On"
        On = 1,
    }

    function sendCMD(CMD: string): void {
        if (!isConnected) {
            connect(SerialPin.P15, SerialPin.P13)
        }
        serial.writeLine(CMD)
    }

    /**
     * Connect DFPlayer Pro
     * @param pinRX RX Pin, eg: SerialPin.P0
     * @param pinTX TX Pin, eg: SerialPin.P1
     */
    //% blockId="dfplayerpro_connect" block="connect to DFPlayer Pro, RX:%pinRX|TX:%pinTX"
    //% weight=100 blockGap=20
    export function connect(pinRX: SerialPin = SerialPin.P15, pinTX: SerialPin = SerialPin.P13): void {
        serial.redirect(pinRX, pinTX, BaudRate.BaudRate115200)
        isConnected = true
        basic.pause(100)

    }

    //% blockId="dfplayerpro_playback_mode" block="play back mode:%myPlayBackMode"
    //% weight=99 blockGap=20
    export function setPlayBackMode(myPlayBackMode: playBackModeType): void {
        sendCMD(`AT+PLAYMODE=${myPlayBackMode}\r\n`)
    }

    //% blockId="dfplayerpro_press" block="press button:%myPlayType"
    //% weight=99 blockGap=20
    export function press(myPlayType: playType): void {
        let cmd: string = ""
        switch (myPlayType) {
            case 0: case 1:
                cmd = "AT+PLAY=PP\r\n";
                break;
            case 2:
                cmd = "AT+PLAY=NEXT\r\n";
                break;
            case 3:
                cmd = "AT+PLAY=LAST\r\n";
                break;
            default:
                cmd = "AT\r\n";
        }
        sendCMD(cmd)
    }

    //% blockId="dfplayerpro_playFile" block="play file number:%fileNumber"
    //% weight=98 blockGap=20 fileNumber.min=1 fileNumber.max=255
    export function playFile(fileNumber: number): void {
        sendCMD(`AT+PLAYNUM=${fileNumber}\r\n`)
    }

    //% blockId="dfplayerpro_setVolume" block="set volume(0~30):%volume"
    //% weight=94 blockGap=20 volume.min=0 volume.max=30
    export function setVolume(volume: number): void {
        sendCMD(`AT+VOL=${volume}\r\n`)
    }

    //% blockId="dfplayerpro_setLED" block="set LED:%led"
    //% weight=94 blockGap=20 
    export function setLED(led: switchType): void {
        let ledPower: string = "";
        if (led == 0)
            ledPower = "OFF";
        else
            ledPower = "ON";

        sendCMD(`AT+LED=${ledPower}\r\n`)
    }

    //% blockId="dfplayerpro_setPrompt" block="set prompt tone:%prompt"
    //% weight=94 blockGap=20 
    export function setPromptTone(prompt: switchType): void {
        let promptTone: string = "";
        if (prompt == 0)
            promptTone = "OFF";
        else
            promptTone = "ON";

        sendCMD(`AT+PROMPT=${promptTone}\r\n`)
    }

}

