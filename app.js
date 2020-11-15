const Render = require('./render');



(async () => {
    console.log(await Render.getVideoMeta('1080.webm'))
})()