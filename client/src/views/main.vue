<template>
  <div :class="classNames">
    <div class="view-content">
      <h1>Now {{state.state}}</h1>
      <track-display mode="large" :track="track" :progress="position"></track-display>

      <div class="toolbar">
        <button v-on:click="setSearchWindow(true)">
          <i class="ion-ios-search"></i>
        </button>
      </div>
    </div>

    <transition name="window">
      <search v-if="showSearch"></search>
    </transition>
  </div>
</template>
<script>
import socket from '../socket'

import trackDisplay from '../components/track-display'
import search from './search'

import {mapGetters, mapActions} from 'vuex'

export default {
  components: {
    search,
    trackDisplay
  },

  data () {
    return {
      track: {},
      trackDetails: {},
      state: {},
      position: 0,
      showSearch: false,
      types: ['album', 'artist', 'track']
    }
  },

  computed: {
    ...mapGetters([
      'showSearch'
    ]),

    classNames () {
      return 'view ' + (this.showSearch ? 'search-open' : '')
    },

    image () {
      if (this.track && this.track.album) {
        return this.track.album.images[1].url
      }

      return ''
    }
  },

  methods: {
    ...mapActions([
      'setSearchWindow'
    ])
  },

  mounted () {
    socket.on('update', ({state, position}) => {
      this.state = state || {}
      this.position = position || 0
    })

    socket.on('trackchange', (track) => {
      this.track = track || {}
      console.log(track)
    })
  }
}
</script>
<style lang="scss" scoped>
  @import '../styles/theme';

  .view {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    overflow-y: auto;
    @include theme('background-color', 'bgPrimary');
    display: flex;
    flex-direction: column;
    align-items: center;

    .view-content {
      display: flex;
      flex: 1 0 auto;
      flex-direction: column;
      justify-content: center;
      padding: 64px;
      max-width: 400px;
      background-color: rgba(0,0,0,0.3);
      box-shadow: 0px 0px 150px 0px rgba(0,0,0,0.3);
      transition-duration: 0.4s;
      transition-property: opacity, transform;
      transition-timing-function: cubic-bezier(0.000, 0.120, 0.235, 1.010);
    }

    &.search-open {
      .view-content {
        opacity: 0.3;
        transform: translate3d(-25%,0,0);
      }
    }
  }

  h1 {
    text-align: center;
    font-size: 30pt;
    @include theme('color', 'primary');
  }

  .search-results {
    .track-display {
      border-bottom: 1px solid #777;
    }
  }

  .window-enter-active, .window-leave {
    transition-property: opacity, transform;
    transition-timing-function: cubic-bezier(0.000, 0.120, 0.235, 1.010);
    transition-duration:  0.3s;
    transform: translate3d(0, 0, 0);
  }

  .window-enter, .window-leave-active {
    opacity: 0;
    transition-duration:  0.3s;
    transform: translate3d(100%, 0, 0);
  }
</style>
