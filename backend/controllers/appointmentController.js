import prisma from "../prisma/client.js";

export const bookAppointment = async (req, res) => {
  try {
    const { physioId, date, time } = req.body;

    // Prevent physio booking as patient
    if (req.user.role !== "USER") {
      return res.status(403).json({
        message: "Only users can book appointments",
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

    // Prevent double booking
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        physioId,
        date,
        time,
      },
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: "Slot already booked",
      });
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        patientId: req.user.id,
        physioId,
        date,
        time,
      },
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};