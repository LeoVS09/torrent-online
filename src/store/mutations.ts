import {MutationTree} from 'vuex'
// TODO: remove webtorrent module, use only webtorrent/webtorrent.min and @types/webtorrent
import WebTorrent from 'webtorrent'
import State, {TorrentStates} from './state'
import {Mutations} from './types'

const mutations: MutationTree<State> = {
    // TODO: fix situation when current torrent id is not
    [Mutations.SET_CURRENT_TORRENT_ID](state, newId: string): void {
        state.currentTorrentId = newId
        destroyCurrentTorrent(state)
    },

    [Mutations.SET_CURRENT_TORRENT](state, torrent: WebTorrent.Torrent) {
        destroyCurrentTorrent(state)

        state.getCurrentTorrent = () => torrent
        state.torrentState = TorrentStates.CREATED
    },

    [Mutations.UPDATE_TORRENT_DOWNLOADING](state, bytes: number) {
        state.justDownloaded = bytes
        state.torrentState = TorrentStates.DOWNLOADING
    },

    [Mutations.SET_TORRENT_DONE](state) {
        state.torrentState = TorrentStates.DONE
    },

    [Mutations.SET_TORRENT_ERROR](state, error) {
        state.torrentState = TorrentStates.ERROR

        if (error)
            state.torrentError = error
    }
}

function destroyCurrentTorrent(state: State) {
    if (!state.getCurrentTorrent)
        return

    state.getCurrentTorrent().destroy(err => {
        if (!err)
            return

        console.error('Error destroy torrent', err)
    })
    state.getCurrentTorrent = undefined
}

export default mutations
