const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.createEvent = async (req, res) => {
  try {
    const { name, count } = req.body;
    const createdBy = req.user.id;

    if (!name || count === undefined || count === null) {
      return res.status(400).json({
        success: false,
        message: 'Пожалуйста, заполните название и кол-во',
      });
    }

    const event = await prisma.event.create({
      data: {
        name,
        count: parseInt(count),
        createdBy,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Мероприятие успешно создано',
      event: {
        id: event.id,
        name: event.name,
        count: event.count,
        createdAt: event.createdAt,
      },
    });
  } catch (error) {
    console.error('Ошибка при создании мероприятия:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера',
      error: error.message,
    });
  }
};

exports.createModule = async (req, res) => {
  try {
    const { name, eventId, names } = req.body;
    const createdBy = req.user.id;

    if (!name || !eventId) {
      return res.status(400).json({
        success: false,
        message: 'Пожалуйста, заполните название и ID мероприятия',
      });
    }

    const event = await prisma.event.findUnique({
      where: { id: parseInt(eventId) },
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Мероприятие не найдено',
      });
    }

    const module = await prisma.module.create({
      data: {
        name,
        eventId: parseInt(eventId),
        createdBy,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Модуль успешно создан',
      module: {
        id: module.id,
        name: module.name,
        eventId: module.eventId,
        createdAt: module.createdAt,
      },
    });
  } catch (error) {
    console.error('Ошибка при создании модуля:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера',
      error: error.message,
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    const event = await prisma.event.findUnique({
      where: { id: parseInt(eventId) },
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Мероприятие не найдено',
      });
    }

    await prisma.event.delete({
      where: { id: parseInt(eventId) },
    });

    res.status(200).json({
      success: true,
      message: 'Мероприятие успешно удалено',
    });
  } catch (error) {
    console.error('Ошибка при удалении мероприятия:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера',
      error: error.message,
    });
  }
};

exports.deleteModule = async (req, res) => {
  try {
    const { moduleId } = req.body;

    const module = await prisma.module.findUnique({
      where: { id: parseInt(moduleId) },
    });

    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Модуль не найден',
      });
    }

    await prisma.module.delete({
      where: { id: parseInt(moduleId) },
    });

    res.status(200).json({
      success: true,
      message: 'Модуль успешно удален',
    });
  } catch (error) {
    console.error('Ошибка при удалении модуля:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера',
      error: error.message,
    });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        modules: true,
        createdByUser: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    console.error('Ошибка при получении мероприятий:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера',
      error: error.message,
    });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await prisma.event.findUnique({
      where: { id: parseInt(eventId) },
      include: {
        modules: true,
        createdByUser: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Мероприятие не найдено',
      });
    }

    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    console.error('Ошибка при получении мероприятия:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера',
      error: error.message,
    });
  }
};
