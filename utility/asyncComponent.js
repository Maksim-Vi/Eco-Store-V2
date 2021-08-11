import dynamic from 'next/dynamic';
import React from 'react';
import Preloader from '../components/common/preloader/Preloader';

export default function asyncComponent(importComponent) {
  return dynamic(importComponent, {
    loading: () => <Preloader />,
  });
}
