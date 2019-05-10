<template>
  <div class="dashboard-container">
    <div class="dashboard-text">姓名: {{ name }}</div>
    <el-table :data="userList" border  >
      <el-table-column fixed prop="id" label="id" align="center"></el-table-column>
      <el-table-column prop="username" label="姓名" align="center"></el-table-column>
      <el-table-column prop="platform" label="平台" align="center"></el-table-column>
    </el-table>
    <!-- <div class="dashboard-text">roles: <span v-for="role in roles" :key="role">{{ role }}</span></div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUser } from '@/api/user'
import { log } from 'util';

export default {
  
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles',
      `token`
    ])
  },
  data(){
    return {
      userList:[],
    }
  },
  created() {
    this.getUser()
    // console.log(this.$store.getters)
  },
  methods: {
    getUser(){
      this.userList = []
      getUser().then(response=>{
        this.userList.push(response.data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
