/* eslint-disable no-undef,func-names,prefer-const */
export default {
  initFacebookSdk() {
    return new Promise((resolve) => {
      window.fbAsyncInit = function () {
        FB.init({
          appId: '206368621072696',
          cookie: true, // enable cookies to allow the server to access the session
          xfbml: true, // parse social plugins on this page
          version: 'v2.10', // use graph api current version
        });
        FB.getLoginStatus((test) => {
          console.log(test);
          resolve();
        });
      };

      (function (d, s, id) {
        let js; const
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    });
  },
};
