import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async ( req, res ) =>
{
  try
  {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if ( !fullname || !email || !phoneNumber || !password || !role )
    {
      return res.status( 400 ).json( {
        message: "Something is missing",
        success: false,
      } );
    }

    const file = req.file; // This can be null if no file is uploaded
    console.log( file ); // Check the file object

    let profilePhoto = null; // Initialize profilePhoto variable

    if ( file )
    {
      const fileUri = getDataUri( file );
      const cloudResponse = await cloudinary.uploader.upload( fileUri.content );
      profilePhoto = cloudResponse.secure_url; // Set the profile photo if a file is uploaded
    }

    const user = await User.findOne( { email } );
    if ( user )
    {
      return res.status( 400 ).json( {
        message: 'User already exists with this email.',
        success: false,
      } );
    }

    const hashedPassword = await bcrypt.hash( password, 10 );

    await User.create( {
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto, // This will be null if no file was uploaded
      },
    } );

    return res.status( 201 ).json( {
      message: "Account created successfully.",
      success: true,
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

export const login = async ( req, res ) =>
{
  try
  {
    const { email, password, role } = req.body;

    if ( !email || !password || !role )
    {
      return res.status( 400 ).json( {
        message: "Something is missing",
        success: false
      } );
    };
    let user = await User.findOne( { email } );
    if ( !user )
    {
      return res.status( 400 ).json( {
        message: "Incorrect email or password.",
        success: false,
      } )
    }
    const isPasswordMatch = await bcrypt.compare( password, user.password );
    if ( !isPasswordMatch )
    {
      return res.status( 400 ).json( {
        message: "Incorrect email or password.",
        success: false,
      } )
    };
    // check role is correct or not
    if ( role !== user.role )
    {
      return res.status( 400 ).json( {
        message: "Account doesn't exist with current role.",
        success: false
      } )
    };

    const tokenData = {
      userId: user._id
    }
    const token = await jwt.sign( tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' } );

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    }

    return res.status( 200 ).cookie( "token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' } ).json( {
      message: `Welcome back ${ user.fullname }`,
      user,
      success: true
    } )
  } catch ( error )
  {
    console.log( error );
  }
}
export const logout = async ( req, res ) =>
{
  try
  {
    return res.status( 200 ).cookie( "token", "", { maxAge: 0 } ).json( {
      message: "Logged out successfully.",
      success: true
    } )
  } catch ( error )
  {
    console.log( error );
  }
}

export const updateProfile = async ( req, res ) =>
{
  try
  {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const file = req.file; // This can be null if no file is uploaded
    let cloudResponse = null; // Initialize cloudResponse to null

    // Check if a file was uploaded and proceed with cloudinary upload if present
    if ( file )
    {
      const fileUri = getDataUri( file );
      cloudResponse = await cloudinary.uploader.upload( fileUri.content );
    }

    let skillsArray;
    if ( skills )
    {
      skillsArray = skills.split( "," );
    }

    const userId = req.id; // middleware authentication
    let user = await User.findById( userId );

    if ( !user )
    {
      return res.status( 400 ).json( {
        message: "User not found.",
        success: false,
      } );
    }

    // Update fields only if they are provided
    if ( fullname ) user.fullname = fullname;
    if ( email ) user.email = email;
    if ( phoneNumber ) user.phoneNumber = phoneNumber;
    if ( bio ) user.profile.bio = bio;
    if ( skills ) user.profile.skills = skillsArray;

    // If a file was uploaded, update the resume information
    if ( cloudResponse )
    {
      user.profile.resume = cloudResponse.secure_url; // Save the cloudinary URL
      user.profile.resumeOriginalName = file.originalname; // Save the original file name
    }

    await user.save();

    // Return updated user information
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status( 200 ).json( {
      message: "Profile updated successfully.",
      user,
      success: true,
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

