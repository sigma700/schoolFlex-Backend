import { School } from "../database/models/school.js";

//for getting all the users

export const getSchools = async (req, res) => {
  try {
    // const { name, type, location, population, fees, system } = req.body;
    const { name } = req.query;

    // If search query exists
    if (name) {
      const schools = await School.findOne({
        name: { $regex: name, $options: "i" },
      });
      return res.json({ success: true, data: schools });
    }

    //else it would return all the schools
    const schoolsData = await School.find();
    res.status(200).json({
      success: true,
      data: schoolsData,
    });
  } catch (error) {
    console.log("There was an error with getting the schools", error.message);
    res.status(500).json({
      success: false,
      data: "Could not get the data",
      error,
    });
  }
};

export const getSChoolByid = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const indivSChool = await School.findById(id);
    if (!indivSChool) {
      throw new Error("School not found");
    }

    res.status(200).json({
      success: true,
      data: indivSChool,
    });
  } catch (error) {
    console.log("Error finding school by id ", error.message);

    res.status(500).json({
      success: false,
      data: "error fetching users",
      error,
    });
  }
};

export const findSchool = async (req, res) => {
  try {
    const { name } = req.query;
    const searchedSchool = await School.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    }).exec();
    console.log("School was found ater searching");
    if (!searchedSchool) {
      return res.status(404).json({
        sucess: false,
        message: "Searched School not found",
        suggestions: await getSearchSuggestions(name),
      });
    }

    return res.status(200).json({
      sucess: true,
      data: searchedSchool,
    });
  } catch (error) {
    console.log("Error finding searched school ", error.message);

    res.status(404).json({
      success: false,
      data: "error fetching users",
      error,
    });
  }
};

//for finding exact search

export const findSchoolExact = async (req, res) => {
  try {
    // Exact match only
    // const searchedArticle = await Blog.find({
    //   name: { $regex: req.query.name, $options: "i" },
    // });

    const school = await School.find({
      name: { $regex: req.query.name, $options: "i" },
    });

    if (!school) {
      throw new Error("Unable to finde searched school");
    }

    res.status(200).json({
      success: true,
      data: school,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Search failed",
    });
  }
};
//helper for search suggestions

async function getSearchSuggestions(partialName) {
  return await School.find({
    name: { $regex: partialName, $options: "i" },
  })
    .limit(5)
    .select("name -_id"); //only returns names
}
