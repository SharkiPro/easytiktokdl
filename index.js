const puppeteer = require("puppeteer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function getVideoUrlFromPage(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  const videoUrl = await page.evaluate(() => {
    const videoElement = document.querySelector("video");
    return videoElement ? videoElement.src : null;
  });

  const cookies = await page.cookies();

  await browser.close();

  if (!videoUrl) {
    throw new Error("Unable to find video URL");
  }

  return { videoUrl, cookies };
}

async function downloadTikTokVideo(url, outputPath) {
  try {
    const { videoUrl, cookies } = await getVideoUrlFromPage(url);

    const outputDir = path.dirname(outputPath);
    const videoName = path.basename(outputPath);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      Referer: url,
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
      Cookie: cookies
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; "),
    };

    const response = await axios.get(videoUrl, {
      responseType: "stream",
      headers: headers,
    });

    const videoPath = path.join(outputDir, videoName);

    const writer = fs.createWriteStream(videoPath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", () => resolve(videoPath));
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("Error while downloading video:", error);
    throw error;
  }
}

module.exports = {
  downloadTikTokVideo,
};
