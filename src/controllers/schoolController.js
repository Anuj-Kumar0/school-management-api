const db = require("../config/db");

const calculateDistance = require("../utils/distanceCalculator");

const addSchool = (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    // Validation
    if (
        !name?.trim() ||
        !address?.trim() ||
        latitude === undefined ||
        longitude === undefined
      ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate latitude & longitude
    if (
      typeof latitude !== "number" ||
      typeof longitude !== "number"
    ) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude must be numbers",
      });
    }

     // Validate latitude range
     if (latitude < -90 || latitude > 90) {
        return res.status(400).json({
          success: false,
          message: "Latitude must be between -90 and 90",
        });
      }
  
      // Validate longitude range
      if (longitude < -180 || longitude > 180) {
        return res.status(400).json({
          success: false,
          message: "Longitude must be between -180 and 180",
        });
      }
  

    const query =
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";

    db.query(
      query,
      [name, address, latitude, longitude],
      (err, result) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            success: false,
            message: "Database error",
          });
        }

        res.status(201).json({
          success: true,
          message: "School added successfully",
          schoolId: result.insertId,
        });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const listSchools = (req, res) => {
    try {
      const { latitude, longitude } = req.query;
  
      // Validation
      if (latitude === undefined || longitude === undefined) {
        return res.status(400).json({
          success: false,
          message: "Latitude and longitude are required",
        });
      }
  
      const userLatitude = parseFloat(latitude);
      const userLongitude = parseFloat(longitude);
  
      if (isNaN(userLatitude) || isNaN(userLongitude)) {
        return res.status(400).json({
          success: false,
          message: "Invalid latitude or longitude",
        });
      }

      // Validate latitude range
if (userLatitude < -90 || userLatitude > 90) {
    return res.status(400).json({
      success: false,
      message: "Latitude must be between -90 and 90",
    });
  }
  
  // Validate longitude range
  if (userLongitude < -180 || userLongitude > 180) {
    return res.status(400).json({
      success: false,
      message: "Longitude must be between -180 and 180",
    });
  }
  
      const query = "SELECT * FROM schools";
  
      db.query(query, (err, schools) => {
        if (err) {
          console.log(err);
  
          return res.status(500).json({
            success: false,
            message: "Database error",
          });
        }
  
        // Add distance to each school
        const schoolsWithDistance = schools.map((school) => {
          const distance = calculateDistance(
            userLatitude,
            userLongitude,
            school.latitude,
            school.longitude
          );
  
          return {
            ...school,
            distance: Number(distance.toFixed(2)),
          };
        });
  
        // Sort nearest to farthest
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);
  
        res.status(200).json({
          success: true,
          count: schoolsWithDistance.length,
          data: schoolsWithDistance,
        });
      });
    } catch (error) {
      console.log(error);
  
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };

  module.exports = {
    addSchool,
    listSchools,
  };