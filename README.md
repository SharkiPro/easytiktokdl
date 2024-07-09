# TikTok Video Downloader (easytiktokdl)

A Node.js module for downloading TikTok videos using a given video URL. The module uses Puppeteer to extract the video URL and Axios to download the video, with customizable download paths.

## Features

- Extracts the direct video URL from a TikTok video page.
- Downloads the video to a specified path.
- Uses Puppeteer to mimic a real browser environment.
- Customizable download paths.

## Installation

To install this module, use npm:

```bash
npm install easytiktokdl
```

## Usage

Here's an example of how to use the `easytiktokdl` module:

```javascript
const { downloadTikTokVideo } = require("easytiktokdl");

const videoUrl = "VIDEO_URL";
const outputPath = "./downloads/tiktok_video.mp4";

(async () => {
  try {
    const videoPath = await downloadTikTokVideo(videoUrl, outputPath);
    console.log("Downloaded video output:", videoPath);
  } catch (error) {
    console.error("Error while downloading video:", error);
  }
})();
```

Replace `VIDEO_URL` with a valid TikTok video URL and `outputPath` with your desired output path.

## API

### `downloadTikTokVideo(url, outputPath)`

Downloads a TikTok video from the given URL to the specified output path.

#### Parameters

- `url` (string): The URL of the TikTok video.
- `outputPath` (string): The path where the video will be saved.

#### Returns

- A promise that resolves to the path of the downloaded video.

## Example

To test the module, you can use the provided `test.js` script:

```javascript
const { downloadTikTokVideo } = require("./index");

const videoUrl = "VIDEO_URL";
const outputPath = "./downloads/tiktok_video.mp4";

(async () => {
  try {
    const videoPath = await downloadTikTokVideo(videoUrl, outputPath);
    console.log("Downloaded video output:", videoPath);
  } catch (error) {
    console.error("Error while downloading video:", error);
  }
})();
```

## Dependencies

- [axios](https://www.npmjs.com/package/axios)
- [puppeteer](https://www.npmjs.com/package/puppeteer)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Author

[SharkiPro](https://github.com/SharkiPro/)
