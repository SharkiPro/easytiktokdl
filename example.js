const { downloadTikTokVideo } = require("./index");

const videoUrl = "VIDEO_URL";
const outputPath = "./downloads/tiktok_video.mp4";

(async () => {
  try {
    const videoPath = await downloadTikTokVideo(videoUrl, outputPath);
    console.log("Video downloaded:", videoPath);
  } catch (error) {
    console.error("Error while downloading video:", error);
  }
})();
