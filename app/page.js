/* 
Flow should be: 
  [] user enters channel ID (ideally this would be username but having issues with that)
  [x] I get the upload playlist ID 
  [x] I find all the videos in that playlist using playlist items
  [] I find all the stats for each video
*/

//this gets the upload playlist for a given channel ID (right now channel ID is hard-coded)
// having issues with channel username because it doesn't always work
const getUploadPlaylist = async () => {
  const channelId = "UCLQDR5DZXp-4N_pBarjw7Vg";
  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${process.env.YOUTUBE_API}`
  );

  return res.json();
};

const getVideos = async () => {
  const uploadPlaylistId = await getUploadPlaylist();
  const playlist =
    uploadPlaylistId.items[0].contentDetails.relatedPlaylists.uploads;
  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2C%20id%2C%20snippet%2C%20status&playlistId=${playlist}&key=${process.env.YOUTUBE_API}`
  );
  return res.json();
};

export default async function Home() {
  const videos = await getVideos();
  // return <pre>{JSON.stringify(uploadPlaylist, null, 2)}</pre>;
  return <pre>{JSON.stringify(videos, null, 2)}</pre>;
}
