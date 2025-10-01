<template>
  <div>
    <video ref="video" controls playsinline style="width:100%;height:auto"></video>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Hls from 'hls.js'

const props = defineProps({
  src: { type: String, required: true }
})
const video = ref(null)
let hls = null

onMounted(() => {
  if (Hls.isSupported()) {
    hls = new Hls()
    hls.loadSource(props.src)
    hls.attachMedia(video.value)
  } else if (video.value.canPlayType('application/vnd.apple.mpegurl')) {
    video.value.src = props.src
  }
})

onBeforeUnmount(() => {
  if (hls) hls.destroy()
})
</script>
