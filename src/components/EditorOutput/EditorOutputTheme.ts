const theme = {
  '&': {
    color: 'white',
    background: 'rgb(30, 30, 30)', // цвет фона редактора,
    height: '100%',
    width: '100%',
    minHeight: '120px',
    borderRadius: '5px',
  },
  '.cm-gutters': {
    backgroundColor: 'rgb(10, 10, 10)', // цвет столба с нумерацией строк
    color: '#ddd',
    border: 'none',
  },
  '.cm-scroller': {
    maxWidth: '100%',
    overflow: 'none',
    borderRadius: '5px',
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
  '.cm-editor': {
    borderRadius: '5px',
  },
};

// eslint-disable-next-line import/prefer-default-export
export { theme };
