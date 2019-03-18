import {ActionContext, ActionTree} from 'vuex'

import State from './state'
import {Actions, Mutations} from './types'

export interface NewTorrentSources {
    file?: string
    magnetUrl?: string
}

// ActionTree<[current state], [root state]>
const actions: ActionTree<State, State> = {
    [Actions.SET_NEW_TORRENT]({commit, state: {getClient}}, {file, magnetUrl}: NewTorrentSources) {
        if (file) {
            // TODO
            console.log('Not implemented yet')
            return
        }

        if (magnetUrl) {
            commit(Mutations.SET_CURRENT_TORRENT_ID, magnetUrl)

            getClient().add(magnetUrl, torrent => {
                commit(Mutations.SET_CURRENT_TORRENT, torrent)

                torrent.on('download', bytes => commit(Mutations.UPDATE_TORRENT_DOWNLOADING, bytes))

                torrent.on('done', () => commit(Mutations.SET_TORRENT_DONE))

                torrent.on('error', err => commit(Mutations.SET_TORRENT_ERROR, err))

                // TODO: use stream
                const video = torrent.files.find(file => {
                    console.log('torrent file', file.name)
                    return file.name.endsWith('.mp4')
                })

                if (!video) {
                    console.error('Not find file')
                    return
                }

                video.appendTo('.video-wrapper', {
                    // @ts-ignore
                    autoplay: true,
                    mounted: true
                })
            })
            return
        }

        console.error('Unknown new torrent source')
    }
}

export default actions
