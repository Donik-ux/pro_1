const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../data/users.json");

// Utility function to read data
const readData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Utility function to write data
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// @desc    Create a new user
// @route   POST /users
// @access  Public (matches frontend proxy)
exports.createUser = async (req, res) => {
  try {
    const { name, phone, email, age } = req.body;
    let users = readData();

    // 1. Validations: name, phone, email mandatory
    if (!name || !phone || !email || age === undefined) {
      return res.status(400).json({
        success: false,
        error: "Vse polya (name, phone, email, age) obyazateleny!",
      });
    }

    // 2. Validation: phone = 13 characters
    if (phone.length !== 13) {
      return res.status(400).json({
        success: false,
        error: "Telefon dolzhen byt' 13 simvolov (+998XXXXXXXXX)",
      });
    }

    // 3. Validation: email includes @
    if (!email.includes("@")) {
      return res.status(400).json({
        success: false,
        error: "Email dolzhen soderzhat' symvol @",
      });
    }

    // 4. Validation: age >= 10
    if (Number(age) < 10) {
      return res.status(400).json({
        success: false,
        error: "Vozrast dolzhen byt' ne men'she 10 let",
      });
    }

    // 5. Validation: no duplicate phone
    const duplicate = users.find((u) => u.phone === phone);
    if (duplicate) {
      return res.status(409).json({
        success: false,
        error: "Pol'zovatel' s takim nomerom uzhe sushchestvuyet",
      });
    }

    // 6. Create actual user object
    const newUser = {
      _id: Date.now().toString(), // local unique ID
      name: name.trim(),
      phone,
      email: email.trim(),
      age: Number(age),
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);
    writeData(users);

    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error: " + err.message,
    });
  }
};

// @desc    Get all users
// @route   GET /users
exports.getAllUsers = async (req, res) => {
  try {
    const users = readData();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Could not fetch users",
    });
  }
};

// @desc    Delete a user
// @route   DELETE /users/:id
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    let users = readData();
    const filteredUsers = users.filter(u => u._id !== id);
    writeData(filteredUsers);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
