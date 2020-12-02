const { spawn } = require("child_process");
const { createWriteStream } = require("fs");

const Upload = require("../models/VideoDetailsSchema");
const port = require("../config/default").port;

// const ffmpegPath = "/usr/bin/ffmpeg";
const ffmpegPath = "C:/ffmpeg/bin/ffmpeg.exe";
// "const ffmpegPath = "C:/Program Files/ffmpeg/bin/ffmpeg.exe";
// "C: \FFmpeg\FFmpeg\bin";
// C: \FFmpeg\FFmpeg\bin; C: \FFmpeg\FFmpeg\bin;

const width = 256;
const height = 144;

const generateThumbnail = (target, title, username) => {
  title = title.replace(/ .mov|.mpg|.mpeg|.wmv|.avi/gi, "");
  let tmpFile = createWriteStream("media/uploads/video_thumbnails/" + title + ".jpg");
  const ffmpeg = spawn(ffmpegPath, [
    "-ss",
    0,
    "-i",
    target,
    "-vf",
    `thumbnail,scale=${width}:${height}`,
    "-qscale:v",
    "2",
    "-frames:v",
    "1",
    "-f",
    "image2",
    "-c:v",
    "mjpeg",
    "pipe:1",
  ]);
  ffmpeg.stdout.pipe(tmpFile);

  // const uploadSchema = mongoose.Schema({
  //   uploader_name: { type: String, required: true },
  //   upload_title: { type: String, required: true },
  //   video_path: { type: String, required: true },
  //   thumbnail_path: { type: String, required: true },
  // });

  // module.exports = mongoose.model("Upload", uploadSchema);
  const VideoDetails = new Upload({
    // const VideoDetails = new VideoDetails({
    uploader_name: username,
    upload_title: title,
    video_path: target,
    thumbnail_path: "http://localhost:" + port + "/api/videos/video_thumbnails/" + encodeURIComponent(title + ".jpg"),
  });
  VideoDetails.save()
    // VideoDetails.save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  generateThumbnail: generateThumbnail,
};
