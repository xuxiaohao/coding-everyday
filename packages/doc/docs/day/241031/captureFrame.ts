type VideoFrame = {
  blob: Blob
  url: string
}

function drawVideo(vdo): Promise<VideoFrame> {
  return new Promise((resolve, reject) => {
    const cvs = document.createElement('canvas')
    const ctx = cvs.getContext('2d')
    cvs.width = vdo.videoWidth
    cvs.height = vdo.videoHeight
    ctx?.drawImage(vdo, 0, 0, cvs.width, cvs.height)

    cvs.toBlob((blob) => {
      if (blob) {
        resolve({
          blob,
          url: URL.createObjectURL(blob),
        })
      } else {
        resolve(null)
      }
    })
  })
}

export function captureFrame(videoFile, time = 0): Promise<VideoFrame> {
  return new Promise((resolve, reject) => {
    const vdo = document.createElement('video')
    vdo.currentTime = time
    vdo.muted = true
    vdo.autoplay = true
    vdo.oncanplay = async () => {
      const frame = await drawVideo(vdo)
      if (frame) {
        resolve(frame)
      } else {
        reject('no frame')
      }
    }
    vdo.onerror = (e) => {
      reject(e)
    }
    vdo.src = URL.createObjectURL(videoFile)
  })
}
