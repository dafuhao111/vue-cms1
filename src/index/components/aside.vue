<script setup lang="ts">
import {computed, ref} from "vue";
import {useUserStore} from "@/stores/user.ts";

interface MenuItem {
  id: number
  name: string
  path: string
  children: MenuItem[]
}

const userStore = useUserStore();
const menuData = computed<MenuItem[]>(() => userStore.userInfo?.menuTree
    || []);
const activeIndex = ref<number>(0);

const toggleMenu = (idx: number) => {
  activeIndex.value = activeIndex.value === idx ? -1 : idx;
}
</script>

<template>
  <div class="aside">
    <ul class="menu">
      <li v-for="(menu,idx) in menuData" :key="menu.id">
        <div class="menu-title" v-bind:class="{active: activeIndex==idx}" @click="toggleMenu(idx)">
          <div class="left">
            <div class="icon"></div>
            <!-- 有子菜单的目录不要 router-link 到 /account 等无页面路由，只负责展开 -->
            <span v-if="menu.children && menu.children.length > 0"
                  class="menu-label">{{ menu.name }}</span>
            <router-link v-else-if="menu.path" :to="menu.path">{{ menu.name
              }}</router-link>
            <span v-else class="menu-label">{{ menu.name }}</span>
          </div>
          <i v-if="(menu.children?.length ?? 0) > 0" class="arrow"></i>
        </div>
        <ul v-if="menu.children && menu.children.length > 0" class="submenu" :class="{show: activeIndex==idx}">
          <li v-for="secondMenu in menu.children" :key="secondMenu.id">
            <router-link v-if="secondMenu.path" :to="secondMenu.path">{{ secondMenu.name }}</router-link>
            <span v-else class="menu-label">{{ secondMenu.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>

.aside {
  width: 260px;
  background: #fff;
  border-right: 1px solid #e5e6eb;
  height: 100vh;
}

li a {
  text-decoration: none;
  color: #999999;
}

.menu-label {
  color: #333;
  user-select: none;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu > li {
  border-bottom: 1px solid #eee;
}

.menu-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  cursor: pointer;
  color: #333;
}

.menu-title.active {
  color: #1677ff;
}

.menu-title .left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  width: 18px;
  height: 18px;
  background: #1677ff;
  border-radius: 3px;
  opacity: 0.85;
}

.menu-title:not(.active) .icon {
  background: #999;
  opacity: 0.6;
}

.arrow {
  border: solid #666;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 4px;
  transform: rotate(45deg);
  transition: transform 0.2s;
}

.menu-title.active .arrow {
  transform: rotate(-135deg);
  border-color: #1677ff;
}

.submenu {
  list-style: none;
  padding-left: 32px;
  margin: 0;
  display: none;
  position: relative;
}

.submenu::before {
  content: "";
  position: absolute;
  left: 18px;
  top: 0;
  bottom: 0;
  border-left: 1px dotted #c0c4cc;
}

.submenu li {
  padding: 10px 0 10px 20px;
  color: #666;
  position: relative;
  cursor: pointer;
}

.submenu li::before {
  content: "";
  position: absolute;
  left: -2px;
  top: 50%;
  width: 12px;
  border-top: 1px dotted #c0c4cc;
}

.submenu li:hover {
  color: #1677ff;
}

.submenu li a.router-link-active {
  color: #1677ff;
  font-weight: 500;
}

.submenu.show {
  display: block;
}

</style>