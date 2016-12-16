<template>
    <div class="search-view">
      <div class="view-content">
        <div class="input">
          <form action="" v-on:submit="commitSearch()">
            <input-container label="search" v-model="query"></input-container>
          </form>
        </div>
        <div class="track-list">
          <transition-group name="tracklist">
            <track-preview :track="track" :key="track" v-for="track in searchResults"></track-preview>
          </transition-group>
        </div>
      </div>
      <div class="toolbar">
        <button v-on:click="setSearchWindow(false)">
          <i class="ion-ios-close"></i>
        </button>
      </div>
    </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import inputContainer from '../components/input'
import trackPreview from '../components/track'
import rest from '../rest'

export default {
  components: {
    inputContainer,
    trackPreview
  },

  data () {
    return {
      query: ''
    }
  },

  computed: {
    ...mapGetters([
      'searchResults'
    ])
  },

  methods: {
    ...mapActions([
      'setSearchWindow',
      'setSearchResults'
    ]),

    commitSearch () {
      rest.search(this.query, ['track']).then((response) => {
        this.setSearchResults(response.tracks.items)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../styles/theme';

  .search-overlay {
  }

  .input {
    padding: 32px;
  }

  .view-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    @include theme('color', 'primary');
  }

  .track-list {
    flex: 1 1 auto;
    overflow-y: auto;

    background-color: rgba(0,0,0,0.3);
    padding: 32px;

    .track {
      margin: 8px 0;
      transition-duration: 0.4s;

      &:hover {
        background-color: rgba(255, 255, 255,0.1);
      }
    }
  }

  .tracklist-enter-active, .tracklist-leave-active {
    transition: all 0.4s;
  }

  .tracklist-enter, .tracklist-leave {
    opacity: 0;
  }

  .search-view {
    position: fixed;
    top: 0; left: auto; right: 0; bottom: 0;
    width: 50vw;
    display: flex;
    flex-direction: column;
    @include theme('background-color', 'bgPrimary');
    box-shadow: 0px 0px 150px 0px rgba(0,0,0,0.7);
  }
</style>
