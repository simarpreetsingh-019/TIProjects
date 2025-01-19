import { useEffect, useRef, useState } from "react";

// Styles
import "./QR.css";

// Qr Scanner
import QrScanner from "qr-scanner";
// import QrFrame from "../assets/qr-frame.svg";

interface Props  {
  setHide: React.Dispatch<React.SetStateAction<boolean>>;
  setQrdata: React.Dispatch<React.SetStateAction<string>>;
}

const QrReader = ({ setHide, setQrdata }: Props) => {
  // QR States
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);

  const onScanSuccess = (result: QrScanner.ScanResult) => {
    console.log(result);
    setQrdata(result?.data);
    setHide(true);
  };

  const onScanFail = (err: string | Error) => {
    console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  return (
    <div className="qr-reader">
      <video ref={videoEl} height={20} width={20}></video>
    </div>
  );
};

export default QrReader;
