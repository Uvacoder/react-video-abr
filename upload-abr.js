require('dotenv').config()
const cloudinary = require('cloudinary').v2

// create dash/vp9 (chrome/ff), hls/h265(apple), hls/h264 (universal) custom profiles
const upOptions = {
    preset: "jugp41hn",
    public_id: 'rooster-test',
    // public_id: "surfing",
    resource_type: "video",
    type: "upload",
    eager: [
        {
            streaming_profile: "full_hd_wifi",
            format: "m3u8",
        },
        {
            streaming_profile: "full_hd_wifi_h265",
            format: "m3u8",
        },
        {
            streaming_profile: "full_hd_wifi_vp9",
            format: "mpd",
        },
    ],
    eager_async: true,
    eager_notification_url:
        "https://webhook.site/aabf3caa-4dea-4a32-9e8c-42f7720b02af",
    invalidate: true
}
cloudinary.uploader
    .upload('https://res.cloudinary.com/picturecloud7/video/upload/v1584394767/remote-media/video/rooster.mp4', upOptions)
    // .upload('https://res.cloudinary.com/picturecloud7/video/upload/v1637431015/People_Surfing_cqmlmx.mp4', upOptions)
    .then(result => {
        console.log(result)
    })
    .catch(error => {
        console.log(error)
    })
