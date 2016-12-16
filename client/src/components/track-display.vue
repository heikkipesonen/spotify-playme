<template>
  <div class="track-display">
    <div class="track-image" :style="image"></div>
    <div class="track-info">
      <div class="track-name">
        {{track.name}}
      </div>
      <div class="track-artist">
        {{artist}}
      </div>
    </div>

     <progress-bar v-if="progress !== false" v-model="progress"></progress-bar>

  </div>
</template>
<script>
import progressBar from '../components/progressbar'

export default {
  components: {
    progressBar
  },

  props: {
    progress: {
      type: [Number, Boolean],
      default () {
        return false
      }
    },
    track: {
      type: Object
    }
  },

  computed: {
    image () {
      if (this.track && this.track.album) {
        return {
          'background-image': `url(${this.track.album.images[0].url})`
        }
      }

      return ''
    },

    artist () {
      return this.track && this.track.album ? this.track.album.artists.map((artist) => artist.name).join(' - ') : ''
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../styles/theme';

  $image-size: 256px;

  .track-display {
    position: relative;
    padding: 64px 0;
    text-align: center;
  }

  .track-image {
    width: $image-size;
    height: $image-size;
    background-size: cover;
    background-position: center center;
    display: inline-block;
    border-radius: 50%;
    box-shadow: 0px 0px 50px -10px rgba(0,0,0,1);
  }

  .track-info {
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
    top: 0; left: 0; right: auto; bottom: auto;
    flex-direction: column;
    padding: 32px 0;
    @include theme('color', 'primary');
  }

  .track-artist {
    overflow: hidden;
    opacity: 0.7;
    white-space: nowrap;
  }

  .track-name {
    white-space: nowrap;
    font-weight: 400;
  }
</style>
