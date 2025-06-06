# React HOC Modal 🚀

[![npm version](https://img.shields.io/npm/v/react-hoc-modal.svg)](https://www.npmjs.com/package/react-hoc-modal)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A lightweight and flexible React modal component that makes creating and managing modals a breeze. Built with Higher-Order Components (HOC) pattern for maximum reusability and simplicity.

## ✨ Features

- 🎯 Simple and intuitive API
- 🔄 State management built-in
- 🎨 Customizable themes
- 📱 Responsive design with bottom sheet support
- 🎭 Multiple modal support
- 🔌 TypeScript support
- 📱 Adaptive bottom sheet for mobile devices

![Example](https://raw.githubusercontent.com/SergoMorello/react.hoc.modal/master/gif/chrome-capture-2025-6-6.gif)

## 📦 Installation

```bash
# Install the package
npm install react-hoc-modal
```

## 🚀 Quick Start

### 1. Set up the Modal Provider

First, wrap your application with the Modal Provider:

```jsx
// index.jsx
import React from 'react';
import Modal from 'react-hoc-modal';

root.render(
  <React.StrictMode>
    <Modal.Provider>
      <App />
    </Modal.Provider>
  </React.StrictMode>
);
```

### 2. Create a Modal Component

Create your modal component using the `withModal` HOC:

```jsx
// MyModal.jsx
import React from 'react';
import Modal from 'react-hoc-modal';

const MyModal = () => {
  const { state } = Modal.useModal();
  
  return (
    <div>
      <h2>{state?.title || 'Default Title'}</h2>
      <p>Hello, I am your modal component!</p>
    </div>
  );
};

export default Modal.withModal(MyModal, {
  title: 'My Awesome Modal',
  theme: 'light'
});
```

### 3. Use the Modal in Your App

```jsx
// App.jsx
import React from 'react';
import MyModal from './MyModal';

const App = () => {
  return (
    <div>
      <button onClick={MyModal.show}>
        Open Modal
      </button>
      <MyModal />
    </div>
  );
};
```

## 🔧 API Reference

### Modal Provider Props

| Prop | Type | Description |
|------|------|-------------|
| SPA | boolean | Enable SPA mode for better routing integration |

### withModal Options

| Option | Type | Description |
|--------|------|-------------|
| title | string | Modal title |
| theme | 'light' \| 'dark' | Modal theme |
| bottomSheet | boolean | Enable bottom sheet mode for mobile devices |
| bottomSheetSnapPoints | string[] | Array of snap points for bottom sheet (e.g. ['50%', '70%']) |
| bottomSheetMaxWidth | number | Screen width breakpoint for bottom sheet (default: 550px) |

### Modal Methods

| Method | Description |
|--------|-------------|
| `show()` | Opens the modal |
| `hide()` | Closes the modal |
| `setState(data)` | Updates modal state |

### useModal Hook

```jsx
const { state } = Modal.useModal();
```

## 📝 Examples

### Basic Usage

```jsx
<button onClick={MyModal.show}>Show Modal</button>
```

### State Management

```jsx
// Update modal state
MyModal.setState({ title: 'New Title' });

// Access state in modal component
const MyModal = () => {
  const { state } = Modal.useModal();
  return <div>{state?.title}</div>;
};
```

### Bottom Sheet Example

```jsx
// BottomSheetModal.jsx
import React from 'react';
import Modal from 'react-hoc-modal';

const BottomSheetModal = () => {
  const { state } = Modal.useModal();
  
  return (
    <div>
      <h2>{state?.title}</h2>
      <p>This modal will appear as a bottom sheet on mobile devices!</p>
    </div>
  );
};

export default Modal.withModal(BottomSheetModal, {
  title: 'Bottom Sheet Example',
  bottomSheet: true,
  bottomSheetSnapPoints: ['50%', '70%'],
  // Optional: customize breakpoint
  bottomSheetMaxWidth: 550
});
```

The modal will automatically:
- Display as a bottom sheet on screens smaller than 550px (or your custom size)
- Show as a regular modal on larger screens
- Support snap points for different heights
- Provide smooth transitions between states

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © Sergey Serov
