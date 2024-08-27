const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path')
const CategoryModel = require('./models/Category.js');
const CardModel = require('./models/Card.js');
const SubCategoryModel = require('./models/SubCategory.js');

require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';

app.use(express.json());
app.use(cookieParser());
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL).then(
  console.log("Db connected")
)

const allowedOrigins = ['http://127.0.0.1:5173', 'http://localhost:3000', 'https://invitingyou-test-server.vercel.app/'];

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use('/api/uploads', express.static('public/uploads'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public/uploads`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// function getUserDataFromReq(req) {
//   return new Promise((resolve, reject) => {
//     jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
//       if (err) throw err;
//       resolve(userData);
//     });
//   });
// }

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ $or: [{ email }, { name }] });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const userDoc = new User({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    userDoc.save((err, user) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(user)
    })
  } catch (e) {
    res.status(400).json({ error: 'Invalid request' });
  }
});


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({
        email: userDoc.email,
        id: userDoc._id
      }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        const { name, _id, email } = userDoc
        res.cookie('token', token).json({ name, _id, email });
      });
    } else {
      res.status(422).json('Wrong password');
    }
  } else {
    res.status(404).json("No user found");
  }
});

app.get('/api/profile', (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post('/api/logout', (req, res) => {
  res.cookie('token', '').json(true);
});

app.post('/api/categories', upload.single("hero_banner"), async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      try {
        const { name, description } = req.body;
        const { filename } = req.file;
        if (name && description && filename) {
          const newCat = new CategoryModel({
            name,
            description,
            hero_banner: filename,
          })
          const new_cat = await newCat.save();
          if (new_cat) {
            return res.status(200).json(newCat);
          } else {
            return res.status(400).json({ message: "something wrong" });
          }
        } else {
          return res.status(400).json({ message: "all fields are required" });
        }
      } catch (error) {
        return res.status(400).json(error);
      }
    });
  } else {
    res.status(401).json();
  }
});

app.put('/api/categories/:id', async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      try {
        const { sub_category } = req.body;
        const { id } = req.params
        console.log(sub_category, id)
        if (sub_category && id) {
          const newSub = new SubCategoryModel({
            name: sub_category
          })
          const saveSub = await newSub.save()
          if (saveSub) {
            const updateCat = await CategoryModel.findByIdAndUpdate(id)
            if (updateCat) {
              updateCat.sub_categories.push(newSub)
              const added = await updateCat.save()
              if (added) {
                return res.status(200).json(newSub);
              } else {
                return res.status(400).json({ message: "something wrong saving" });
              }
            } else {
              return res.status(400).json({ message: "something wrong fetching" });
            }
          } else {
            return res.status(400).json({ message: "something wrong while saving sub category" });
          }
        }else{
          return res.status(400).json({ message: "all fields are required" });
        }
      } catch (error) {
        return res.status(400).json(error);
      }
    });
  } else {
    res.json("You are not authorized");
  }
})

app.put('/api/subcategories/:id', upload.single("image"), async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      try {
        const { name, designer, color, shape, price } = req.body;
        const { id } = req.params;
        const { filename } = req.file;

        if (name && designer && filename && color && shape && price && id) {
          const newCard = new CardModel({
            name,
            designer,
            color,
            shape,
            price,
            image: filename
          })
          const new_card = await newCard.save();
          const updatedCat = await SubCategoryModel.findByIdAndUpdate(id)
          updatedCat.cards.push(new_card)
          const added = await updatedCat.save()
          if (added) {
            return res.status(200).json(newCard);
          } else {
            return res.status(400).json({ message: "something wrong" });
          }
        } else {
          return res.status(400).json({ message: "all fields are required" });
        }
      } catch (error) {
        return res.status(400).json(error);
      }
    });
  } else {
    res.json("You are not authorized");
  }
});

app.get('/api/subcategories', async(req,res)=>{
  try{
    const sub_categories = await CategoryModel.find().populate('sub_categories')
    if(sub_categories){
      return res.status(200).json(sub_categories)
    }else{
      return res.status(400).json({ message: "something wrong" });
    }
  }catch(err){
    return res.status(400).json(err);
  }
})

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await CategoryModel.find()
    res.send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/categories/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const subCategory = req.query.sub_cat; // Get the value of the sub_cat query parameter

    const categoryQuery = CategoryModel.findById(categoryId)
      .populate({
        path: 'sub_categories',
        populate: {
          path: 'cards',
          model: 'Card'
        }
      });

    // Add the sub_category query if provided
    if (subCategory) {
      categoryQuery.populate({
        path: 'sub_categories',
        match: { _id: subCategory },
        populate: {
          path: 'cards',
          model: 'Card'
        }
      });
    }

    const category = await categoryQuery.exec();
    res.status(200).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


app.get('/api/cards', async (req, res) => {
  try {
    const { designer, color, shape } = req.query;
    const filters = {};

    if (designer) filters.designer = designer;
    if (color) filters.color = color;
    if (shape) filters.shape = shape;

    const cards = await CardModel.find(filters);
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/card/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const card = await CardModel.findById(id);
    res.json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(5000);