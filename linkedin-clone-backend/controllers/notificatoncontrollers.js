const Notification = require("../models/notifications");

const getUserNotification = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user._id,
    })
      .sort({ createdAt: -1 })
      .populate("relatedUser", "firstName userName profilePicture")
      .populate("relatedPost", "content image");

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching user notifications:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const markNotificationRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      {
        _id: req.params.id,
        recipient: req.user._id,
      },
      { read: true },
      { new: true }
    );

    res.status(200).json(notification);
  } catch(error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const deleteNotification = async (req, res) => {
    try {
      const notification = await Notification.findByIdAndDelete(
        {
          _id: req.params.id,
          recipient: req.user._id,
        },
      );
  
      res.status(200).json(notification);
    } catch {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };

module.exports = {getUserNotification, markNotificationRead, deleteNotification};
