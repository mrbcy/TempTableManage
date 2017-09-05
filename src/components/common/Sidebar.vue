<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="hasPermission(currentUser.role, item.role)">
                    <template v-if="item.subs">
                        <el-submenu :index="item.index">
                            <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                            </el-menu-item>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.index">
                            <i :class="item.icon"></i>{{ item.title }}
                        </el-menu-item>
                    </template>
                </template>

            </template>
        </el-menu>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import _ from 'underscore'
    
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-date',
                        index: 'tableList',
                        title: '临时表备案',
                        role: ['user']
                    },
                    {
                        icon: 'el-icon-upload',
                        index: 'userList',
                        title: '用户管理',
                        role: ['user', 'admin']
                    }
                ]
            }
        },
        computed: _.extend({}, mapGetters({currentUser:'getCurrentUser'}), {
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        })
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
