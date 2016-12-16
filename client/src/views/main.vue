<template>
  <h2>main template</h2>
</template>
<script>
import socket from '../socket'

export default {
  mounted () {
    socket.on('update', (data) => {
      console.log('update', data)
    })
    socket.on('trackchange', (data) => {
      console.log('trackchange', data)
    })
  }
}
</script>
<style lang="scss"></style>
