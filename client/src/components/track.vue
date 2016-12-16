<template>
  <div class="track">
    <div class="track-image" :style="image"></div>
    <div class="track-info">
      <div class="track-name">
        {{track.name}}
      </div>
      <div class="track-artist">
        {{artist}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    track: {
      type: Object
    }
  },

  computed: {
    image () {
      if (this.track && this.track.album) {
        return {
          'background-image': `url(${this.track.album.images[1].url})`
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
  $image-size: 96px;

  .track {
    position: relative;
  }

  .track-image {
    width: $image-size;
    height: $image-size;
    background-size: cover;
    background-position: center center;
  }

  .track-info {
    padding-left: 16px;
    padding-right: 16px;
    position: absolute;
    left: $image-size; right: 0; bottom: 0; top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
