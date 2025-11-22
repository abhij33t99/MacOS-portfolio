import { useState } from 'react';
import { Desktop } from './components/layout/Desktop';
import { WelcomeScreen } from './components/os/WelcomeScreen';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  if (showWelcome) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  return <Desktop />;
}

export default App;
