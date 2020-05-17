import Lingallery from 'lingallery';

import jQuery from 'jquery'
import VueCarousel from 'vue-carousel';

import Pagination from 'laravel-vue-pagination'
window.$ = window.jQuery = jQuery;

export default async ({Vue}) => {
  $;
  Vue.use(Lingallery);
  Vue.use(VueCarousel);
  Vue.use(require('vue-moment'));
  Vue.use(VueCarousel);
  Vue.component('pagination', require('laravel-vue-pagination'));
}
