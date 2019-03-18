<template>
    <div class="home">
        <input type="text" v-model="magnetUrl" placeholder="Input magnet url">
        <button @click="handleDownloadClick">Download</button>
        <div class="video-wrapper">
            <!--<video autoplay controls preload="auto"></video> -->
        </div>
    </div>
</template>

<script lang="ts">
    import HelloWorld from '@/components/HelloWorld.vue'
    import {NewTorrentSources} from '@/store/actions'
    import {Component, Vue} from 'vue-property-decorator'
    import {Getter, Action} from 'vuex-class'
    import WebTorrent from 'webtorrent'
    import {Actions} from '../store/types'

    @Component({
        components: {
            HelloWorld,
        },
    })
    export default class Home extends Vue {

        magnetUrl: string = ''

        @Action(Actions.SET_NEW_TORRENT)
        // @ts-ignore
        setNewTorrent: (sources: NewTorrentSources) => Promise<WebTorrent.Torrent>

        handleDownloadClick() {

            this.setNewTorrent({magnetUrl: this.magnetUrl})

        }
    }
</script>
