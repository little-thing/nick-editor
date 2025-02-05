import '@nick-editor/editor/index.css';
import { Editor } from './components/Editor';
import './App.css';
import { LineChart } from 'lucide-react';

function App() {
  return (
    <>
      <div className={'container'}>
        <LineChart />
        <Editor />
      </div>
    </>
  );
}

export default App;
