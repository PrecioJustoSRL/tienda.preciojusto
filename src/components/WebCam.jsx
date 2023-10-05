import React, { useRef, useState, useEffect } from 'react';

const CamScreen = () => {

    const videoRef = useRef(null);
    const [mediaStream, setMediaStream] = useState(null);

    const sendVideoData = (data) => {
        socket.emit("videoData", data);
    };

    useEffect(() => {
        const enableVideoStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: {
                        facingMode:'environment'
                } });
                console.log(stream)
                setMediaStream(stream);
            } catch (error) {
                console.error('Error accessing webcam', error);
            }
        };               

        enableVideoStream();
    }, []);               

    useEffect(() => {
        if (videoRef.current && mediaStream) {
            videoRef.current.srcObject = mediaStream;
        }
    }, [videoRef, mediaStream]);

    useEffect(() => {
        return () => {   
            if (mediaStream) {   
                mediaStream.getTracks().forEach((track) => {
                    track.stop();
                });
            }
        };
    }, [mediaStream]);

  console.log(mediaStream)
  console.log(videoRef)

    return (
        <div>
            <video ref={videoRef} autoPlay={true} />
        </div>
    )
}
export default CamScreen;






// useEffect(() => {
//     if (videoRef.current && mediaStream) {
//         videoRef.current.srcObject = mediaStream;
//     }
// }, [videoRef, mediaStream]);
