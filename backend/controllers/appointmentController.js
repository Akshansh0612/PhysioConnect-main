import prisma from "../prisma/client.js";

// BOOK APPOINTMENT
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

// GET MY APPOINTMENTS
export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        patientId: req.user.id,
      },

      include: {
        physio: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "Appointments fetched successfully",
      appointments,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


export const getPhysioAppointments = async (req, res) => {
  try {
    // Only physios allowed
    if (req.user.role !== "PHYSIO") {
      return res.status(403).json({
        message: "Only physios can access this",
      });
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        physioId: req.user.id,
      },

      include: {
        patient: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "Physio appointments fetched successfully",
      appointments,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const { status } = req.body;

    // Only physio allowed
    if (req.user.role !== "PHYSIO") {
      return res.status(403).json({
        message: "Only physios can update appointments",
      });
    }

    // Find appointment
    const appointment = await prisma.appointment.findUnique({
      where: {
        id: Number(appointmentId),
      },
    });

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    // Ensure physio owns appointment
    if (appointment.physioId !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized access",
      });
    }

    // Update status
    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: Number(appointmentId),
      },

      data: {
        status,
      },
    });

    res.status(200).json({
      message: "Appointment status updated",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    // Find appointment
    const appointment = await prisma.appointment.findUnique({
      where: {
        id: Number(appointmentId),
      },
    });

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    // Only patient can cancel
    if (appointment.patientId !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized access",
      });
    }

    // Delete appointment
    await prisma.appointment.delete({
      where: {
        id: Number(appointmentId),
      },
    });

    res.status(200).json({
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};