const ap = new APlayer({
    container: document.getElementById('aplayer'),
	fixed: true,
	mini: true,
    autoplay: false,
    loop: 'all',
    volume: 0.7,
    listFolded: true,
    listMaxHeight: 60,
    audio: [
        {
            name: '最近在聽的歌',
            artist: '星茶会',
            url: '/music/星茶会.mp3',
            cover: '/img/avatar.png',
        },
		{
            name: '最近在聽的歌',
            artist: 'Fullmetal Alchemist Brotherhood',
            url: '/music/Fullmetal-Alchemist-Brotherhood.mp3',
            cover: '/img/avatar.png',
        }
    ]
});