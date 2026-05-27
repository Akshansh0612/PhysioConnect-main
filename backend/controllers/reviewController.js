import prisma from "../prisma/client.js";

export const createReview = async (req, res) => {
  try {
    const { physioId, rating, comment } = req.body;

    // Only users can review
    if (req.user.role !== "USER") {
      return res.status(403).json({
        message: "Only users can add reviews",
      });
    }

    // Check physio exists
    const physio = await prisma.user.findUnique({
      where: {
        id: physioId,
      },
    });

    if (!physio || physio.role !== "PHYSIO") {
      return res.status(404).json({
        message: "Physio not found",
      });
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        physioId,
        userId: req.user.id,
      },
    });

    res.status(201).json({
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getPhysioReviews = async (req, res) => {
  try {
    const { physioId } = req.params;

    const reviews = await prisma.review.findMany({
      where: {
        physioId: Number(physioId),
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "Reviews fetched successfully",
      reviews,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};