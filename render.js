var Ffmpeg = require('fluent-ffmpeg');

/**
 * @param {string} inputFile This is the video you want to encode
 * @param {string} outputFile This is the export location of the video
 * @param {number} vBitrate This is the video bitrate expressed in KB/s
 * @param {number} aBitrate This is the audio bitrate expressed in KB/s
 * @param {string} vSize This is the video resolution, expressed as 1920x1080 for 1080p
 * @param {string} vCodec https://en.wikipedia.org/wiki/Codec - must be compatable with ffmpeg
 * @param {string} vFormat Video format or 'container' must be compatable with the codec
 * @param {number} speed This is the speed of the encoder, faster will cost efficency
 */
var Encode = (inputFile, outputFile, vBitrate, aBitrate, vSize, vCodec = 'libvpx-vp9', vFormat = 'webm', speed = 16) => {
    return new Promise((resolve, reject) =>{
        var render = Ffmpeg(inputFile)
            .videoCodec(vCodec)
            .size(vSize)
            .format(vFormat)
            .videoBitrate(vBitrate)
            .audioBitrate(aBitrate)
            .outputOptions(`-speed ${speed}`)
            .on('progress', function(info) { console.log(`${outputFile} | ${Math.round(info.percent * 1000) / 1000 }%`) })
            .on('error', function(err, stdout, stderr) { reject('Error') })
            .on('end', function() { resolve('encoded') })
            .output(`${outputFile}.${vFormat}`)
            .run();
    });
};

/**
 * @param {string} inputFile This is the video you choose to be inspected
 * @returns {Array} metadata This array is a ffprobe inspection of the metadata
 */
var Probe = async(inputFile) => { 
    return new Promise(async(resolve, reject) => {
        Ffmpeg.ffprobe(inputFile, function(error, metadata) {

            if(error) reject(error);

            resolve(metadata)
        })
    })
}

/**
 * @param {string} inputFile This is the video you choose to be inspected
 * @param {boolean} debug This will console.log everything retrived from Probe()
 * @returns {string} codec Video codec https://en.wikipedia.org/wiki/Codec
 * @returns {number} width The width of the video in pixels
 * @returns {number} height The height of the video in pixels
 * @returns {string} aspect https://en.wikipedia.org/wiki/Display_aspect_ratio
 */
async function getVideoMeta(inputFile, debug = false){
    var Probed = await Probe(inputFile).then(output => { return output; })
    var stream = Probed.streams[0];
    if(debug) console.log(Probed);

    return {
        'codec': stream.codec_name,
        'width': stream.width,
        'height': stream.height,
        'aspect': stream.display_aspect_ratio
    };
}

module.exports = {
    Encode,
    Probe,
    getVideoMeta
}
