
const mongoose = require('mongoose');

mongoose.connect('mongodb://rest:rest25@ds046667.mlab.com:46667/mosh-rest', { useNewUrlParser: true })
  .then(() => console.log('Connected to mongoDB...'))
  .catch((error) => console.error('Couldnt connect to mongoDB...', error));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    _id: new mongoose.Types.ObjectId, // generate proper id
    name: 'Java',
    author: 'Nazar',
    tags: ['backend'],
    isPublished: false
  });
  
  const result = await course.save();
  console.log(result);
}
// createCourse(); // will add a new course

async function getCourse() {
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)
  // will have $ sign before (e.g. $gt)

  // or
  // and

  const courses = await Course
    // .find({ author: 'Mosh' })
    // .find({ price: { $gte: 10, $lte: 20 }})
    // .find({ price: { $in: [15, 20, 30]}})
    // .find()
    // .and([ { author: 'Mosh' }, { isPublished: true } ])

    // starts with Mosh:
    // .find({ author: /^Mosh/ })
    
    // ends with Hamedani:
    // .find({ author: /Hamedani$/i })
    
    // contains Mosh
    .find({ author: /.*Mosh.*/i })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
    // .countDocuments() // 5
    console.log(courses);
  }
// getCourse();


async function updateCourse() {
  const course = await Course.findById('5c60811b2bc8da0cbc91a0ca');
  // If the schema of id is not of type ObjectId you cannot operate with findById()
  if (!course) return console.log('Course not found');

  course.isPublished = true;
  course.author = 'Brad';

  // course.set({
  //   isPublished: false,
  //   author: 'Brad'
  // });

  // course.save();
  console.log(course);
}
// updateCourse();

// We have these two ways of generating a valid ids:
// If the schema of id is not of type ObjectId you cannot operate with findById()
var id = mongoose.Types.ObjectId(); // will generate a new id
var id2 = new mongoose.Types.ObjectId; // will also generate a new id
// console.log(id, id2); 


// https://stackoverflow.com/questions/17899750/how-can-i-generate-an-objectid-with-mongoose
