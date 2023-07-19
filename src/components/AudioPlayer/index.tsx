import { useRef, useEffect } from 'react'
import { useAppDispatch } from '../../hooks'
import { setAudioError, setAutoPlay } from '../../store/stations/stationsSlice'

interface AudioPlayerProps {
  streamUrl: string
  autoPlay: boolean
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ streamUrl, autoPlay }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (streamUrl && audioRef.current) {
      audioRef.current.src = streamUrl
      if (autoPlay) {
        audioRef.current.play().catch(error => {
          console.log('error: ', error.message)
          //re rendering seems to duplicate the play request, need to check if this is dev environment only (react double render issue)
          if (
            error.message ==
            'The play() request was interrupted by a new load request. https://goo.gl/LdLk22'
          ) {
            console.log('already about to play')
          } else {
            // alert('Radio Stream is down')
            dispatch(setAutoPlay(false))
            dispatch(setAudioError(error.message))
          }
        })
      } else {
        audioRef.current.pause()
      }

      audioRef.current.onplaying = () => {
        dispatch(setAudioError(null))
      }
    } else if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [streamUrl, autoPlay])

  return <audio ref={audioRef} data-testid='audioPlayer' />
}

export default AudioPlayer
