const Render = require('./render');



(async () => {



    
    await Render.Encode(`${__dirname}/public/Wallpaper.mp4`, `${__dirname}/public/1`, 1500, 192, '1920x1080');
    

})()
