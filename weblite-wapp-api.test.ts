import IWindow from '.';

const IMAGE_SRC = 'http:st.jpg';
const AUDIO_SRC = 'http:st.mp3';
const W = (window as IWindow).W;

W.images.openModal({ src: IMAGE_SRC });
W.images.openModal({ src: IMAGE_SRC, width: 5000 });
W.audioSystem.play(AUDIO_SRC);

(async () => {
  const { name, id, privateChat } = await W.chats.getPublicChatByUsername(
    'Ali.m',
  );

  const {} = await W.chats.getById('parasa');
})();

W.setHooks({
  wappWillStart: (start, _, info) => {
    start();
    console.log(info);
  },
  onHalt: ({ mode }) => {},
});

W.user.editProfile('school');
