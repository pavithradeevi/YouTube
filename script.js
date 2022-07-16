const VideoCardContainer = document.querySelector('.Video-Container');

let url= "AIzaSyDDhJwFdaY9tT-mKFIPJ2yvV69qbR2ALB8";
// let videos = "https://youtube.googleapis.com/youtube/v3/videos?";
let channel="https://youtube.googleapis.com/youtube/v3/channels?"
let search="https://youtube.googleapis.com/youtube/v3/search?"

let videos= "https://youtube.googleapis.com/youtube/v3/videos?"






fetch(videos + new URLSearchParams({
    key:url,
    part:'snippet',
    chart :'mostPopular',
    maxResult:0,
    regionCode:'IN'
    // id: "QmpTkkaKYSU",


}))
.then((res)=>{
    return res.json()
})
.then((data)=>{
    console.log(data)
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch((err)=>{
    console.log(err)
})
const getChannelIcon = (video_data) => {
    fetch(channel + new URLSearchParams({
        key: url,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then((res)=>{
        return res.json()
    })
    // .then((data)=>{
    //     console.log(data)
    // })
    .then((data) => {
        video_data.channelthumbnail = data.items[0].snippet.thumbnails.default.url;
        console.log(video_data)
        makeVideoCard(video_data);
    })
}
const makeVideoCard = (data) => {
    VideoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelthumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = search;

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})
