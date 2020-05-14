<template>
  <q-page>
    <header-home-component/>
    <div class="row q-tabs__content--align-center">
      <div class="col-xl-9 col-lg-9 col-md-10 col-sm-12 col-xs-12" style="margin-top: 50px;">
        <div class="row">
          <div class="col-xl-9 col-lg-9 col-md-7 col-sm-12 col-xs-12">
            <trending-articles-home-component/>
            <articles-author-service-component/>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-xs-12 padding-10">
            <featured-home-articles-component/>
            <photos-home-component/>
          </div>
        </div>
      </div>
    </div>
<!--    <footer-home-component/>-->
  </q-page>
</template>

<script>
  import HeaderHomeComponent from "../components/home/HeaderHomeComponent";
  import TrendingArticlesHomeComponent from "../components/home/TrendingArticlesHomeComponent";
  import SubscribeToNewsletterComponent from "../components/home/SubscribeToNewsletterComponent";
  import ArticlesAuthorServiceComponent from "../components/home/ArticlesAuthorServiceComponent";
  import FooterHomeComponent from "../components/home/FooterHomeComponent";
  import FeaturedHomeArticlesComponent from "../components/home/FeaturedHomeArticlesComponent";
  import PhotosHomeComponent from "../components/home/PhotosHomeComponent";
  export default {
    name: 'PageIndex',
    components: {
      PhotosHomeComponent,
      FeaturedHomeArticlesComponent,
      FooterHomeComponent,
      ArticlesAuthorServiceComponent,
      SubscribeToNewsletterComponent,
      TrendingArticlesHomeComponent,
      HeaderHomeComponent
    },
  }
</script>
