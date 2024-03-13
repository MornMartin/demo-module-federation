<template>
    <ConfigProvider :theme="theme">
        <component :is="mdfComponent" :channel="channel"></component>
    </ConfigProvider>
</template>
<script lang="ts" setup>
import { theme } from './theme';
import router from './router';
import { ConfigProvider } from "ant-design-vue";
import { loadDynamicComponent } from "@utils/mdf.loader";
import { defineAsyncComponent, shallowRef, onMounted, computed, watch, onBeforeUnmount, ref } from 'vue';

import { EMessagegProtocols } from "@/utils/protocols";
import Channel from '@/utils/Channel';

const channel = new Channel<EMessagegProtocols, any>();
const host = channel.register((e) => {
    console.log(e);
}, 'host')

const mdfScopeId = ref('');
const mdfComponent = shallowRef(null);
const mdfName = computed(() => router.currentRoute.value.query.module);

const mdfNameWatcher = watch(mdfName, e => {
    if(!e) {
        console.error('需指定加载模块名称')
    }else {
        moduleLoader(e as string)
    }
})
/**
 * 卸载组件关联style标签
 */
const styleUnloader = (scopeId: string) => {
    if(!scopeId) return;
    const styles = document.getElementsByTagName('style');
    for(const item of styles) {
        if(item.innerText.includes(`[${scopeId}]`)) {
            item.remove();
        }
    }
}
/**
 * 加载模块联邦组件
 */
const moduleLoader = (name: string) => {
    mdfComponent.value = defineAsyncComponent(async () => {
        try{
            const res = await loadDynamicComponent(name, `${window.location.origin}/remoteEntry.js`);
            styleUnloader(mdfScopeId.value);
            mdfScopeId.value = res.__scopeId;
            console.log('加载模块成功：', name);
            return res;
        }catch(err) {
            console.error(err)
            return null;
        }
    })
}

onMounted(() => {
    // console.log(router.currentRoute.value);
})
onBeforeUnmount(() => {
    mdfNameWatcher();
    host.unregister();
    channel.destroy();
})

</script>
<style lang="less" scoped></style>
