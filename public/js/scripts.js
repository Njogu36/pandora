var Tawk_API = Tawk_API || {},
Tawk_LoadStart = new Date();
(function() {
var s1 = document.createElement("script"),
    s0 = document.getElementsByTagName("script")[0];
s1.async = true;
s1.src = 'https://embed.tawk.to/5901f18164f23d19a89af8ed/default';
s1.charset = 'UTF-8';
s1.setAttribute('crossorigin', '*');
s0.parentNode.insertBefore(s1, s0);
})();

if (window.innerWidth > 1050) {

    // init controller
    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 0,
            offset: 1
        }
    });

    // build scenes
    new ScrollMagic.Scene({
            triggerElement: ".generalPageWrapper",
            duration: "80%"
        })
        .setTween("#mainslider", 1, {
            opacity: "0",
            top: -150,
            ease: Linear.easeNone,
        })
        .addTo(controller);

    // build scenes
    new ScrollMagic.Scene({
            triggerElement: "#BeforeMainContainer",
            duration: "70%"
        })
        .setTween(".topic__header", 1, {
            opacity: "0",
            top: -150,
            ease: Linear.easeNone,
        })
        .addTo(controller);
}
