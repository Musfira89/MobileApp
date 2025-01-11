import React from 'react';
import App from '../App';
import { NavigationIndependentTree } from '@react-navigation/core';


export default function Index() {
  return (
    <NavigationIndependentTree>
        <App />
    </NavigationIndependentTree>

  );
}
