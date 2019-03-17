<template>
  <div class="home">
    <div class="video-wrapper">
      <!-- <video autoplay controls preload="auto"></video> -->
    </div>
  </div>
</template>

<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue' 
import { Component, Vue } from 'vue-property-decorator'
import {addTorrent} from '../torrents'
import WebTorrent from 'webtorrent'

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  
  public mounted() {
    addTorrent()
    .then((torrent: WebTorrent.Torrent) => {
        // Torrents can contain many files. Let's use the .mp4 file
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
  }
}
</script>
