<h1>React.hoc.modal</h1>

##	React component for easy create modals

## install
```
npm i react-hoc-modal

// if you use typescript install types
npm i @types/react@{this you react version} @types/react-dom@{this you react version} -D
```

### Examples

#### Mount modal provider
```js
// index.js
import Modal from 'react-hoc-modal';
...
root.render(
  <React.StrictMode>
	<Modal.Provider SPA>
		<App />
	</Modal.Provider>
  </React.StrictMode>
);
```

#### Create modal component
```js
// MyFirstModal.jsx
...
import Modal from 'react-hoc-modal';

const MyFirstModal = () => {

	return(<div>Hello, i am you first modal component</div>);
};

export default Modal.withModal(MyFirstModal,{
	title: 'Easy modal',
	theme: 'light'
});
```

#### Mount modal component
```js
// App.jsx
...
import MyFirstModal from "./MyFirstModal";
...
const App = () => {
	...
	return(
		...
		<MyFirstModal/>
	);
}
```

#### Use modal component
```js
<button onClick={MyFirstModal.show}>Show my first modal</button>
```

#### If you need update data without 'props', you can use the 'setState' method.
```js
MyFirstModal.setState({testData: 'Hello'});
```

#### To get data use the 'state' property in the returned 'useModal' hook object.
```js
const MyFirstModal = () => {
	const {state} = Modal.useModal();

	return(<div>{state?.testData}</div>);
};
```