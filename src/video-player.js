import 'cloudinary-video-player/dist/cld-video-player.min.js';
import 'cloudinary-video-player/dist/cld-video-player.min.css';
import React, { useRef, useEffect, useState } from 'react'

const VideoPlayer = ( props) => {
  const videoEl = useRef();
  const [cloud] = useState(props.cloudName);
  const [id] = useState(props.publicId);
  const [jsLoaded, setJSLoaded] = useState(false);
  // const [cssLoaded, setCSSLoaded] = useState(false)

  useEffect(() => {
    const scriptTag = document.createElement('script');
    scriptTag.src = 'https://cdn.jsdelivr.net/npm/cloudinary-video-player@1.9.1/dist/cld-video-player.min.js';
    scriptTag.addEventListener('load', () => setJSLoaded(true));
    document.body.appendChild(scriptTag);
  }, [jsLoaded]);

  // useEffect(() => {
  //   const cssTag = document.createElement('link');
  //   cssTag.href = 'https://cdn.jsdelivr.net/npm/cloudinary-video-player@1.9.1/dist/cld-video-player.min.css';
  //   cssTag.rel='stylesheet'
  //   cssTag.addEventListener('load', () => setCSSLoaded(true));
  //   document.body.appendChild(cssTag);
  // }, [cssLoaded]);

  useEffect(() => {
    if (!jsLoaded) return;

    const videoPlayer = window.cloudinary.videoPlayer(videoEl.current, {
      cloud_name: cloud,
      muted: true,
      controls: true,
      width: '100%',
    });
    videoPlayer.source(id, {
      sourceTypes: ['dash', 'hls','mp4'],
    });
    }, [jsLoaded,cloud,id]);

  return (
    <div>
      <video
        className='cld-video-player cld-fluid'
        ref={videoEl}
        id='video-player'
      />
    </div>
  );
};
export default VideoPlayer;