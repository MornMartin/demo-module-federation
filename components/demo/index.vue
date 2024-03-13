<template>
    <div class="wrap">
        {{helloworld}}
        <img width="100px" :src="require('./assets/test.png')"/>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { IMessage, nullBroadcaster, nullUnregister } from '@/utils/Channel';
import { EMessagegProtocols, TMessageChannel } from '@/utils/protocols';

import i18n, { $t } from './i18n';
import store from './store';
import api from './api';

console.log('i18n', i18n);
console.log('store', store);
console.log('api', api);

export default defineComponent({
    components: {  } ,
    props: {
        channel: {
            type: Object,
            require: true,
        },
    },
    data() {
        return {
            broadcaster: nullBroadcaster,
            unregister: nullUnregister,
            helloworld: 'hello demo'
        }
    },
    methods: {
        onMessage(m: IMessage<EMessagegProtocols, any>) {
            console.log(m);
        },
    },
    created() {
        const { broadcaster, unregister } = (this.channel as TMessageChannel).register(this.onMessage, 'components/demo');
        this.unregister = unregister;
        this.broadcaster = broadcaster;
        console.log('created');
    },
    mounted() {
        this.broadcaster({protocols: EMessagegProtocols.test, payload: 'components/demo mounted'})
        console.log('mounted');
    },
    beforeUnmount() {
        this.unregister();
        console.log('beforeUnmount');
    }
})
</script>
<style lang="less" scoped>
.wrap{
    height: 100px;
    width: 300px;
    background: #66ccff;
    color: #ee0000;
}
</style>