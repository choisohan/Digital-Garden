---
title: firebase
---

[[firestore]],[[noSQL]],[[realtime database]]


# 🛍 Before start
## 1. Cloud Firestore vs realtime Database
![](https://static.javatpoint.com/tutorial/firebase/images/firebase-vs-realtime-database.png)
-   **Cloud Firestore** is Firebase's newest database for mobile app development. It builds on the successes of the Realtime Database with a new, more intuitive data model. Cloud Firestore also features richer, faster queries and scales further than the Realtime Database.
    
-   **Realtime Database** is Firebase's original database. It's an efficient, low-latency solution for mobile apps that require synced states across clients in realtime.

from -> https://firebase.google.com/docs/database/rtdb-vs-firestore?authuser=0

* most of cases firestore is better choice*


## 2. Glossary
1. collection
2. document
3. snapShot
4. docRef
5. rules







---

# ⭐ How to start
## 0. Install Firebase
```
$ npm i firebase
```

## 1. Initialize Firebase
[watch this](https://www.youtube.com/watch?v=rQvOAnNvcNQ)
[document](https://firebase.google.com/docs/firestore/quickstart#web-version-9_1)
```js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
	apiKey: "",
	authDomain: "",
	projectId: "",
	storageBucket: "",
	messagingSenderId: "",
	appId: "",
	measurementId: ""
}
/* get it from your firebase page */

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);  
const analytics = getAnalytics(app);
//const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

```

## 2. Write New Data
```js
import {addDoc} from 'firebase/firestore'
addDoc(collection(db,"users"),finalData) ;

var newDoc = addDoc(collection(db,"users"),finalData).then(
	docRef => {
		console.log(docRef.id);
	})
//get id

```

## 3. Read All Data
[Document](https://firebase.google.com/docs/firestore/query-data/get-data#custom_objects)
```js
import {getDocs} from 'firebase/firestore'
const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => { 
	console.log(doc.id, " => ", doc.data());  
});
```

However, as I noted on [[javascript#^f3d8d0]], `await` will cause the error unless you enable the feature on node. so instead, you can convert the code as below.
```js
Promise.resolve(getDocs(collection(db, "users"))).then((querySnapshot) => {
    querySnapshot.forEach((doc)=>{
        console.log(doc.data())
    })
});
```

## 4. Get Data by ID
```js
import { doc, getDoc} from "firebase/firestore";

var docRef = doc(db,"users",firebaseId);
Promise.resolve(getDoc(docRef)).then((docSnap)=>{
    if(docSnap.exists()){
        var data = docSnap.data();
        console.log(data)
    }
})
```

## 5. Edit Data
- setDoc() : to create or overwrite a single document

```js
import { setDoc} from "firebase/firestore";
var docRef = doc(db,"users",firebaseId);
Promise.resolve(setDoc(docRef,data))
```

- updateDoc() : to update some field of a document without overwritng the entire document
```js
```



# Debug
#### 1. index.esm2017.js:366 Uncaught (in promise) FirebaseError: Missing or insufficient permissions.
Solution : cloud firestore - Rules - Edit rules
```json
//https://github.com/actions-on-google/smart-home-nodejs/issues/369
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read;
      allow write: if false;
    }
  }
}
```

