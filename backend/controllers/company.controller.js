import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
            })
        };
        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateCompany = async ( req, res ) =>
{
  try
  {
    const { name, description, website, location } = req.body;

    let logo = null; // Initialize logo to null

    const file = req.file; // This can be null if no file is uploaded
    if ( file )
    {
      // If a file is uploaded, proceed with Cloudinary upload
      const fileUri = getDataUri( file );
      const cloudResponse = await cloudinary.uploader.upload( fileUri.content );
      logo = cloudResponse.secure_url; // Set logo to Cloudinary URL
    }

    // Prepare the update data
    const updateData = { name, description, website, location };

    // Only add logo to updateData if it exists
    if ( logo )
    {
      updateData.logo = logo;
    }

    // Find the company by ID and update
    const company = await Company.findByIdAndUpdate( req.params.id, updateData, { new: true } );

    if ( !company )
    {
      return res.status( 404 ).json( {
        message: "Company not found.",
        success: false,
      } );
    }

    return res.status( 200 ).json( {
      message: "Company information updated.",
      success: true,
      company, // Optionally return the updated company info
    } );
  } catch ( error )
  {
    console.log( error );
    return res.status( 500 ).json( {
      message: "Internal server error.",
      success: false,
    } );
  }
};

