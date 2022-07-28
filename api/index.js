require('dotenv').config()
const cloudinary = require('cloudinary').v2

// exit if not a post or preset, publicId and remoteURL not included
exports.handler = async function (event, context) {
// const cld_upload_abr = async function (event, context) {
    try {
        if (!event.body || event.httpMethod !== 'POST') {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
                body: JSON.stringify({
                    status: 'invalid-method',
                }),
            };
        }
        // get data
        const data = JSON.parse(event.body);
        console.log(JSON.stringify(data, null, 2));
        const presetOption = data.preset;
        const publicId = data.publicId;
        const remoteURL = data.remoteURL;

        // must contain a public id preset that matches env variable
        if (!publicId || !remoteURL || (presetOption !== process.env.PRESET)) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
                body: JSON.stringify({
                    status: 'invalid-preset-option',
                }),
            };
        }

        const upOptions = {
            preset: presetOption,
            public_id: publicId,
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
        const resp = await cloudinary.uploader
            .upload(remoteURL, upOptions)

    } catch (error) {
        return {
            statusCode: error.code,
            body: JSON.stringify(error)
        };
    }
}

