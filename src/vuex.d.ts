import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';
import { State } from '@/plugins/app/_config/types';

declare module '@vue/runtime-core' {

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}
