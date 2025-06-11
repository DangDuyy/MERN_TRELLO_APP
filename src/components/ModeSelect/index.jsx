import { useColorScheme } from '@mui/material/styles';

function ModeSelect() {
  const { mode, setMode } = useColorScheme();

  if (!mode) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div>
        Mode: 
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          style={{ 
            marginLeft: '8px',
            padding: '4px 8px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
  );
}

export default ModeSelect;