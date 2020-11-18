# ExportMachine
JavaScript service used to encode video

This is designed to work alongside fluent-ffmpeg to achieve goals of effectively encoding media. 

For this example the JS is requiring 'render.js' as Render.


### Thiss command is the basic requirements for encoding the media
``` await Render.Encode('Test.mp4', 'Output', 3500, 192, '1920x1080', 'libvpx-vp9', 'webm', '16'); ```


Params in order
 - The Source file
 -  The Output file
 - Video Bitrate
 - Audio Bitrate 
 - Resolution - expressed as 1920x1080
 - Codec of the video - ffmpeg codec
 - Format or Container of the video
 - Speed of the encoder, faster will drop quality and potentially increase file size
