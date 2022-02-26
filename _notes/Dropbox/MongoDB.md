---
title: MongoDB
---

# 
- Cluster 


# Mongoose 
## Getting Started 
https://mongoosejs.com/docs/
```js
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_SRV,{
    useNewUrlParser : true,
    useUnifiedTopology : true
  }).then(()=>{
    console.log('connected to the database')
  }).catch((err)=>{
    console.log(err)
  })
  
```


## Set Up Data format
1. Schema 
```js
const TodoSchema = new mongoose.Schema({
  name: String
});
```

2. Model
```javascript
const Todo = mongoose.model('Todo', TodoSchema);
```


## Save and Find , Edit and Delete
1. Save
```js 
new Todo({name : "laundry"}).save();
```
![[Pasted image 20220225140912.png]]

2. Find Data with properties
```js
await Todo.find({ name: /^laundry/ })  ;
// a name property that begins with "laundry"

await Todo.find({ name: new RegExp('Wine', 'i')  }) ) ;
// find item contains 'Wine'

```
[[Regex]] -> get help


3. Update / [example](https://mongoosejs.com/docs/tutorials/findoneandupdate.html)
```js
const filter = { name: /^laundry/ } ;
const update = { checked : true };
await Todo.findOneAndUpdate(filter, update); 
```

5. Delete
```js
await Todo.deleteOne( {name : /^laundry/ } ) ;// delete top one
await Todo.deleteMany( {name : /^laundry/ } ) ;// delete all matching
```

6. Get all Datas / [Ref](https://masteringjs.io/tutorials/mongoose/find-all)
```javascript
//option 1 
await Todo.find();


// option 2
To loop through all users
const cursor = Todo.find().cursor();
for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
  // Use `doc`
}

//option 3 : most simple!
for await (const doc of this.model.find() ){
 	console.log( doc)
}
```

# Intergration
## Cron Schedule
- [Doc 1](https://docs.atlas.mongodb.com/triggers/cron-expressions/)