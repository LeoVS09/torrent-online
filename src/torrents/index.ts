// @ts-ignore
import MediaElementWrapper from 'mediasource'
import WebTorrent from 'webtorrent/webtorrent.min'

const torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F' + 
  '%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-' + 
  'js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.' + 
  'org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftr' + 
  'acker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io' + 
  '%2Ftorrents%2Fsintel.torrent'

const client = new WebTorrent()

export const addTorrent = () => new Promise<WebTorrent.Torrent>((resolve, reject) => {
    client.on('error', (err: any) => {
        reject(err)
        console.error('Error in client', err)
    })

    client.add(torrentId, (torrent: WebTorrent.Torrent) => {
        torrent.on('download', (bytes: number) => {
            console.log('just downloaded: ' + bytes)
            console.log('total downloaded: ' + torrent.downloaded)
            console.log('download speed: ' + torrent.downloadSpeed)
            console.log('progress: ' + torrent.progress)
          })

        torrent.on('done', () => console.log('Torrent is done!'))

        torrent.on('error', (err: any) => console.error('Error in torrent', err))

        resolve(torrent)
      })
})


export function addStreamToVideo(video: WebTorrent.TorrentFile) {
    const videoElement = document.querySelector('video')
    if (!videoElement) {
          console.log('Cannot find video element')
          return
        }
    const wrapper = new MediaElementWrapper(videoElement)

        // The correct mime type, including codecs, must be provided
    const writable = wrapper.createWriteStream('video/webm; codecs="vorbis, vp8"')

    videoElement.addEventListener('error', () => {
          // listen for errors on the video/audio element directly
          const errorCode = videoElement.error
          const detailedError = wrapper.detailedError
          // wrapper.detailedError will often have a more detailed error message
        })

    writable.on('error',  (err: any) => {
          console.error('Error when write stream', err)
        // listening to the stream 'error' event is optional
        })

    const readable = video.createReadStream()

    readable.pipe(writable)
}
