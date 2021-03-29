import { expectType } from 'tsd';
import IWindow from '.';

const W = (window as IWindow).W;

expectType<void>(W.images.openModal({ src: 'src' }));

expectType<Promise<undefined>>(
  W.messages.sendMessageToCurrentChat('text', 'sst'),
);
expectType<Promise<string>>(
  W.messages.sendMessageToCurrentChat('wapp', {
    wisId: '1',
    width: 50,
    height: 50,
    wappId: '15',
  }),
);
