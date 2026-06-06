export function createTheme(isDark) {
  return isDark
    ? {
        background: '#101418',
        surface: '#181f25',
        text: '#eef4f6',
        muted: '#b4c0c7',
        border: '#2d3941',
        primary: '#26a69a',
        primarySoft: '#163c3a',
        input: '#111a20',
        placeholder: '#7e8d96',
        footer: '#0b1014',
        footerText: '#d7e1e5',
        success: '#58d68d',
        danger: '#ff7676',
      }
    : {
        background: '#f5f7f7',
        surface: '#ffffff',
        text: '#172126',
        muted: '#596970',
        border: '#dce5e7',
        primary: '#00796b',
        primarySoft: '#e2f2ef',
        input: '#fbfdfd',
        placeholder: '#8c9ba1',
        footer: '#172126',
        footerText: '#edf5f5',
        success: '#0b875b',
        danger: '#c24141',
      };
}
