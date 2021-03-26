import { IWindow } from './index.d.ts';

const IMAGE_SRC = 'http:st.jpg';
const AUDIO_SRC = 'http:st.mp3';
const window: IWindow;

window.W.images.openModal({ src: IMAGE_SRC });
window.W.images.openModal({ src: IMAGE_SRC, width: 5000 });
window.W.audioSystem.play(AUDIO_SRC);

window.W(async () => {
  const {
    name,
    id,
    privateChat,
  } = await window.W.chats.getPublicChatByUsername('Ali.m');

  const {} = await window.W.chats.getById('parasa');
})();

window.W.setHooks({
  wappWillStart: (start, _, info) => {
    start();
    console.log(info);
  },
  onHalt: ({ mode }) => {},
});
