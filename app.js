const soundsElement = document.querySelector('#sounds');
const stopButton = document.querySelector('#stopButton');

// stopButton.addEventListener('click', stopAll);

(async () => {
    const sounds = await getSounds();
    addSoundsToPage(sounds);
})();

async function getSounds() {
    const response = await fetch('./sounds.json');
    const json = await response.json();
    return json;
}

function addSoundsToPage(sounds) {
    const players = [];
    sounds.forEach((sound) => {
        const soundDiv = document.createElement('div');
        soundDiv.className = 'sound';

        const playButton = document.createElement('button');
        playButton.classList = 'button';
        playButton.textContent = sound.title;
        soundDiv.appendChild(playButton);

        const player = document.createElement('audio');
        player.setAttribute('src', `sounds/${sound.src}`);
        soundDiv.appendChild(player);
        players.push({ player, soundDiv });

        playButton.addEventListener('click', () => {
            player.currentTime = 0;
            player.play();
        });

        soundsElement.appendChild(soundDiv);
    });

    document.querySelector('#stopButton').addEventListener('click', stopAll);
    function stopAll() {
        players.forEach(({ player }) => {
            player.pause();
        });
    }
}
