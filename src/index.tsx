// orch-app/src/index.tsx

// Import deps
import React from 'react';
import { render } from 'react-dom';

// Import components
import { Members } from './components/members';

// Import styles
import './styles/styles.css';

// Find div container
const rootElement = document.getElementById('root');

// Render Bookshelf component in the DOM
render(<Members />, rootElement);
