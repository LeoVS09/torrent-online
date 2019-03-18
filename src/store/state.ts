import WebTorrent from 'webtorrent/webtorrent.min'

export enum TorrentStates {
    UNKNOWN = 'unknown',
    CREATED = 'created',
    DOWNLOADING = 'downloading',
    DONE = 'done',
    ERROR = 'error'
}

export default class State {
    public getClient: () => WebTorrent.Instance
    public currentTorrentId?: string
    public getCurrentTorrent?: () => WebTorrent.Torrent
    public justDownloaded: number = 0
    public torrentState = TorrentStates.UNKNOWN
    public torrentError?: any

    constructor() {
        const client = new WebTorrent()

        client.on('error', err => {
            console.error('Error in client', err)
            // TODO: add clientError
        })

        this.getClient = () => client
    }
}
