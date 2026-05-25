import prisma from "../prisma/client.js";

export const createPhysioProfile = async (req, res) => {
  try {
    const { specialization, experience, fees, location } = req.body;

    // Check role
    if (req.user.role !== "PHYSIO") {
      return res.status(403).json({
        message: "Only physios can create profile",
      });
    }

    // Check existing profile
    const existingProfile = await prisma.physioProfile.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    if (existingProfile) {
      return res.status(400).json({
        message: "Profile already exists",
      });
    }

    // Create profile
    const profile = await prisma.physioProfile.create({
      data: {
        specialization,
        experience,
        fees,
        location,
        userId: req.user.id,
      },
    });

    res.status(201).json({
      message: "Physio profile created",
      profile,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};