import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const vimeoPlayer = new Player(iframe);

const currentTime = function ({ seconds }) {
  localStorage.setItem('videoplayer-current-time', seconds);
};

vimeoPlayer.on('timeupdate', throttle(currentTime, 1000));
vimeoPlayer.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
vimeoPlayer.off('timeupdate', currentTime);