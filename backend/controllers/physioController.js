import prisma from "../prisma/client.js";

// CREATE PHYSIO PROFILE
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

// GET ALL PHYSIOS
export const getAllPhysios = async (req, res) => {
  try {
    const physios = await prisma.physioProfile.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "Physios fetched successfully",
      physios,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET SINGLE PHYSIO
export const getSinglePhysio = async (req, res) => {
  try {
    const { id } = req.params;

    const physio = await prisma.physioProfile.findUnique({
      where: {
        id: Number(id),
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (!physio) {
      return res.status(404).json({
        message: "Physio not found",
      });
    }

    res.status(200).json({
      message: "Physio fetched successfully",
      physio,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};