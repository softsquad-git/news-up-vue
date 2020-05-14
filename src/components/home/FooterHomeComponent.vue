<template>
    <footer class="footer">
      <div class="row q-tabs__content--align-center">
        <div class="col-xl-9 col-lg-9 col-md-10 col-sm-10 col-xs-12">
          <div class="row">
            <div class="col-lg-4 padding-10">
              <div class="footer-logo">
                <q-img src="../../assets/img/logo.png" alt="logo-footer"/>
              </div>
              <div class="footer-text">
                Mauris eu nisl tincidunt, ultrices justo vitae, porta elit. Maecenas sit amet mauris tristique,
                aliquam ligula quis, rutrum turpis. Praesent bibendum nulla non lorem pretium hendrerit nec at dolor.
                Proin dictum a ligula in dignissim.
              </div>
              <div class="sm-footer">
                <div class="title-footer">
                  Follow Us
                </div>
                <div class="row">
                  <div class="col-lg-4 text-center icon-footer" id="facebook">
                    <i class="fa fa-facebook"/>
                  </div>
                  <div class="col-lg-4 text-center icon-footer" id="youtube">
                    <i class="fa fa-youtube"/>
                  </div>
                  <div class="col-lg-4 text-center icon-footer" id="twitter">
                    <i class="fa fa-twitter"/>
                  </div>
                </div>
              </div>
              <subscribe-to-newsletter-component style="margin-top: 40px"/>
            </div>
            <div class="col-lg-4 padding-10">
              <div class="title-footer">
                FEATURED POSTS
              </div>
            </div>
            <div class="col-lg-4 padding-10">
              ...
            </div>
          </div>
        </div>
      </div>
    </footer>
</template>

<script>
    import SubscribeToNewsletterComponent from "./SubscribeToNewsletterComponent";
    export default {
        name: "FooterHomeComponent",
      components: {SubscribeToNewsletterComponent}
    }
</script>
