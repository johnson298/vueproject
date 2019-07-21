import Vue from 'vue';
import VxTooltip from './layouts/components/vx-tooltip/VxTooltip.vue';
import VxCard  from './components/vx-card/VxCard.vue';
import VxList  from './components/vx-list/VxList.vue';
import VxBreadcrumb  from './layouts/components/VxBreadcrumb.vue';
import FeatherIcon  from './components/FeatherIcon.vue';
import VxInputGroup  from './components/vx-input-group/VxInputGroup.vue';
import Paginate from 'vuejs-paginate';
import VsTable from './components/vs-table-custom/vsTable.vue';

Vue.component(VxTooltip.name, VxTooltip);
Vue.component(VxCard.name, VxCard);
Vue.component(VxList.name, VxList);
Vue.component(VxBreadcrumb.name, VxBreadcrumb);
Vue.component(FeatherIcon.name, FeatherIcon);
Vue.component(VxInputGroup.name, VxInputGroup);
Vue.component('paginate', Paginate);
Vue.component('vs-table-custom', VsTable);
