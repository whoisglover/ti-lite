import React, {useRef, useEffect, useState} from "react";
import { useAppDispatch } from "../hooks";
import { setAudioError } from "../store/stations/stationsSlice";

interface AudioPlayerProps {
    streamUrl: string;
    autoPlay: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({streamUrl, autoPlay}) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(streamUrl && audioRef.current){
            audioRef.current.src = streamUrl;
            if(autoPlay){
                audioRef.current.play().catch(error => {
                    console.log('error: ', error)
                    // alert('Radio Stream is down')
                    dispatch(setAudioError(error.message));
                });
            } else {
                audioRef.current.pause();
            }
            
            audioRef.current.onplaying = () => {
                dispatch(setAudioError(null));
            }
        } else if(audioRef.current) {
            audioRef.current.pause();
        }
    }, [streamUrl, autoPlay])

    return <audio ref={audioRef} />
}

export default AudioPlayer;