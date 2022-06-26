import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const ref = useRef<HTMLVideoElement>(null);
  const [isPictureInPicture, setIsPictureInPicture] = useState(false);

  useEffect(() => {
    if (ref.current) {
      ref.current.onenterpictureinpicture = function (event) {
        console.log('enter', this, event);
        setIsPictureInPicture(true);
      };

      ref.current.onleavepictureinpicture = function (event) {
        console.log('leave', this, event);
        setIsPictureInPicture(false);
      };
    }
  }, [ref]);

  const handlePictureInPicture = useCallback(() => {
    ref.current?.requestPictureInPicture();
  }, [ref]);

  return (
    <div className="App">
      <p>ola</p>
      <video
        ref={ref}
        style={{ width: "500px" }}
        src="/video-example.mov"
        controls
      />
      <br />
      <button onClick={handlePictureInPicture}>picture in picture</button>
      {isPictureInPicture && <button onClick={() => document.exitPictureInPicture()}>close picture in picture</button>}
    </div>
  );
}

export default App;
