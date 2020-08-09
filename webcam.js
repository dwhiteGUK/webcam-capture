let streamStarted = false;
const video = document.querySelector('video');
const canvas = document.querySelector('canvas');
const screenshotImage = document.querySelector('button');

const CONSTRAINTS = {
  video: {
    width: {
      min: 1280,
      ideal: 1920,
      max: 2560,
    },
    height: {
      min: 720,
      ideal: 1080,
      max: 1440
    },
    facingMode: 'face'
  }
}

const devices = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();

  return devices;
}

const handleStream = (stream) => {
  video.srcObject = stream;
  video.play();
  streamStarted = true;
}

export const requestPermission = async () => {
  const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
  console.log('requestPermission -> stream', stream)

  handleStream(stream);
}

const doScreenshot = () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  screenshotImage.src = canvas.toDataURL('image/webp');

  canvas.classList.remove('hidden');
}


const init = () => {
  requestPermission();

  screenshotImage.addEventListener('click', doScreenshot);
}

export default init(); 