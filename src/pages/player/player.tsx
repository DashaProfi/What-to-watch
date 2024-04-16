import { useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../types/store';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getOneFilm } from '../../store/films-slice';
import { Link, Navigate, useParams } from 'react-router-dom';
import { convertTimePlayer } from '../../services/convert-time';
import { AppRoutes } from '../../const/const';

const Player = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const videoTag = useRef<HTMLVideoElement>(null);
  const progress = useRef<HTMLProgressElement>(null);

  const { oneFilm, isLoading } = useSelector((state: AppState) => state.films);
  const { id: filmIdStr } = useParams();

  const [videoIsPlay, setVideoIsPlay] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const handleDurationChange = () => {
    if (videoTag.current) {
      setTimeLeft(videoTag.current.duration);
    }
  };

  const handlePlayPauseClick = () => {
    if (videoIsPlay) {
      videoTag.current?.pause();
    } else {
      videoTag.current?.play();
    }
    setVideoIsPlay((prev) => !prev);
  };

  const handlePointerDown = (event: any) => {
    event.target.setPointerCapture(event.pointerId);
    setIsPointerDown(true);
  };

  const handlePointerMove = (event: any) => {
    if (progress.current && isPointerDown) {
      const newProgress =
        ((event.clientX - progress.current.getBoundingClientRect().left) *
          100) /
        progress.current.offsetWidth;

      if (newProgress >= 0 && newProgress <= 100 && videoTag.current) {
        setVideoProgress(newProgress);

        const currTime = (newProgress * videoTag.current.duration) / 100;
        setTimeLeft(videoTag.current.duration - currTime);

        videoTag.current.currentTime = currTime;
      }
    }
  };

  const handlePointerUp = (event: any) => {
    setIsPointerDown(false);
  };

  const handleCurrentTimeChange = (event: any) => {
    if (progress.current) {
      const newProgress =
        ((event.clientX - progress.current.getBoundingClientRect().left) *
          100) /
        progress.current.offsetWidth;

      if (newProgress >= 0 && newProgress <= 100 && videoTag.current) {
        setVideoProgress(newProgress);

        const currTime = (newProgress * videoTag.current.duration) / 100;
        setTimeLeft(videoTag.current.duration - currTime);

        videoTag.current.currentTime = currTime;
      }
    }
  };

  const handleFullScreen = () => {
    if (videoTag.current) {
      videoTag.current.requestFullscreen;
    }
  };

  useEffect(() => {
    if (filmIdStr) {
      dispatch(getOneFilm(filmIdStr));
    }
  }, [filmIdStr]);

  useEffect(() => {
    let currentTimeInterval: ReturnType<typeof setInterval>;
    if (videoIsPlay) {
      currentTimeInterval = setInterval(() => {
        if (videoTag.current) {
          setCurrentTime(videoTag.current.currentTime);
          setTimeLeft(videoTag.current.duration - videoTag.current.currentTime);
        }
      }, 50);
    }

    return () => clearInterval(currentTimeInterval);
  }, [videoIsPlay]);

  useEffect(() => {
    if (
      videoTag.current &&
      videoTag.current.currentTime === videoTag.current.duration
    ) {
      setVideoIsPlay(false);
      setTimeLeft(videoTag.current.duration);
    }
  }, [videoTag.current?.currentTime]);

  useEffect(() => {
    if (videoTag.current && videoTag.current.duration > 0) {
      setVideoProgress(
        (videoTag.current.currentTime * 100) / videoTag.current.duration
      );
    }

    if (
      videoTag.current &&
      videoTag.current.currentTime === videoTag.current.duration
    ) {
      setVideoProgress(0);
    }
  }, [videoTag.current?.currentTime]);

  return (
    <div className='player'>
      {isLoading === true ? (
        <div style={{ marginLeft: '50%', marginTop: '50%' }}>Loading...</div>
      ) : (
        <>
          <video
            ref={videoTag}
            src={oneFilm?.videoLink}
            poster={oneFilm?.previewImage}
            className='player__video'
            loop={false}
            muted={false}
            onDurationChange={handleDurationChange}
          />

          <Link
            to={AppRoutes.Main}
            type='button'
            className='player__exit'
            style={{
              textDecoration: 'none',
            }}
          >
            Exit
          </Link>

          <div className='player__controls'>
            <div className='player__controls-row'>
              <div className='player__time' onClick={handleCurrentTimeChange}>
                <progress
                  ref={progress}
                  className='player__progress'
                  value={videoProgress}
                  max='100'
                />
                <div
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onDragStart={() => false}
                  className='player__toggler'
                  style={{ left: `${videoProgress}%` }}
                >
                  Toggler
                </div>
              </div>
              <div className='player__time-value'>
                {convertTimePlayer(timeLeft)}
              </div>
            </div>

            <div className='player__controls-row'>
              <button
                type='button'
                className='player__play'
                onClick={handlePlayPauseClick}
              >
                {videoIsPlay ? (
                  <>
                    <svg viewBox='0 0 14 21' width='14' height='21'>
                      <use xlinkHref='#pause'></use>
                    </svg>
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <svg viewBox='0 0 19 19' width='19' height='19'>
                      <use xlinkHref='#play-s'></use>
                    </svg>
                    <span>Play</span>
                  </>
                )}
              </button>
              <div className='player__name'>{oneFilm?.name}</div>

              <button
                onClick={handleFullScreen}
                type='button'
                className='player__full-screen'
              >
                <svg viewBox='0 0 27 27' width='27' height='27'>
                  <use xlinkHref='#full-screen'></use>
                </svg>
                <span>Full screen</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Player;
