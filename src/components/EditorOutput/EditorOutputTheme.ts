const theme = {
  '&': {
    color: 'white',
    background: 'grey', // цвет фона редактора,
    height: '100%',
    width: '100%',
  },
  '.cm-gutters': {
    backgroundColor: 'dark-grey', // цвет столба с нумерацией строк
    color: '#ddd',
    border: 'none',
  },
  '.cm-scroller': {
    maxWidth: '100%',
    overflow: 'none',
  },
  '.ͼb': {
    color: 'yellow',
    fontWeight: '700',
  },
  '.ͼc': {
    color: 'blue',
    fontWeight: '700',
  },
  '.cm-line': {
    color: '#0f0',
  },
  '.cm-lintRange-error': {
    color: 'red',
  },
};

// eslint-disable-next-line import/prefer-default-export
export { theme };
