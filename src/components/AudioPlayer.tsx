import React, {useRef, useEffect} from "react";

interface AudioPlayerProps {
    streamUrl: string;
    autoPlay: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({streamUrl, autoPlay}) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if(streamUrl && audioRef.current){
            audioRef.current.src = streamUrl;
            audioRef.current.play();
        } else if(audioRef.current) {
            audioRef.current.pause();
        }
    }, [streamUrl])

    return <audio ref={audioRef} />
}

export default AudioPlayer;