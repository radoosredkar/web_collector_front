<template>
  <div v-if="!isHidden" class="loader"></div>
</template>

<script>
export default {
  name: 'Spinner',
  data () {
    return {
      isHidden: true
    }
  },
  methods: {
    toggle: function(){
      this.isHidden = !this.isHidden;
    },
    hide: function(){
      this.isHidden = true;
    },
    show: function(){
      this.isHidden = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loader {
  position: absolute;
  top: 10px;
  right: 10px;
  border: 10px solid #f3f3f3;
  border-radius: 50%;
  border-top: 10px solid #3498db;
  width: 20px;
  height: 20px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
