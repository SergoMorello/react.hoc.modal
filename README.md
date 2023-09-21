<h1>React.hoc.modal</h1>

##	React component for easy create modals

## install
```
npm i react-hoc-modal
```

### Examples

#### Mount modal provider
```js
// index.js
import Modal from 'react-hoc-modal';
...
root.render(
  <React.StrictMode>
	<Modal.Provider>
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