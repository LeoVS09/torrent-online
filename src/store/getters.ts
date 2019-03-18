import {GetterTree} from 'vuex'
import WebTorrent from 'webtorrent'
import State from './state'

// GetterTree<[current state], [root state]>
const getters: GetterTree<State, State> = {

    current(state): { id?: string, torrent?: WebTorrent.Torrent } {
        return {
            id: state.currentTorrentId,
            torrent: state.currentTorrent
        }
    },

    downloaded(state) {
        if (!state.currentTorrent)
            return 0

        return state.currentTorrent.downloaded
    },

    downloadSpeed(state) {
        if (!state.currentTorrent)
            return 0

        return state.currentTorrent.downloadSpeed
    },

    progress(state) {
        if (!state.currentTorrent)
            return 0

        return state.currentTorrent.progress
    },

    files(state) {
        if (!state.currentTorrent)
            return []

        return state.currentTorrent.files
    }
}

export default getters
