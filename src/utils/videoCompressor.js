// Video compression utility for 60KB max file size
// Use FFmpeg to compress videos before adding to public/videos folder

// Command to compress videos to ~60KB:
// ffmpeg -i input.mp4 -vf "scale=320:240" -c:v libx264 -crf 35 -preset fast -c:a aac -b:a 32k -ac 1 -r 15 output.mp4

export const compressionSettings = {
  maxFileSize: '60KB',
  resolution: '320x240',
  framerate: 15,
  videoBitrate: '100k',
  audioBitrate: '32k',
  crf: 35
};

// Instructions for manual compression:
// 1. Install FFmpeg on your system
// 2. Run the command above for each video
// 3. Place compressed videos in public/videos/ folder
// 4. Name them video1.mp4, video2.mp4, etc.

console.log('Video compression settings:', compressionSettings);